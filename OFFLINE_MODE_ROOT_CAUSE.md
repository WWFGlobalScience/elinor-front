# Offline Mode Bug - Root Cause & Complete Fix

## The Problem

Despite setting `OFFLINE_MODE=false` in GitLab CI/CD, the app was still running in offline mode:

```
[onload middleware] offlineModeEnabled: true ❌
[onload middleware] app.$config.offlineMode: false ✓
[onload middleware] Skipping dispatch - offline mode enabled ❌
```

The store state showed `true` while the runtime config showed `false`.

## Root Cause Analysis

### Previous Understanding (Incomplete)

The initial investigation identified that:
- Store state is initialized at module load time (build-time)
- Runtime config is injected at runtime
- Middleware syncs them in `onload.js`

But the fix wasn't working because of a **hidden persistence layer** 🎯

### The REAL Root Cause: Vue Persist is Re-hydrating Stale State

**vuex-persist plugin** was automatically restoring state from localStorage, which was persisting the OLD `offlineModeEnabled` value:

1. **First deployment** with undefined/true `OFFLINE_MODE` → `offlineModeEnabled: true` persisted to localStorage
2. **New deployment** with `OFFLINE_MODE=false`:
   - Store initializes with `offlineModeEnabled: isOfflineModeEnabled()`
   - vuex-persist immediately restores from localStorage → `offlineModeEnabled: true` (stale!)
   - Middleware syncs it, but...
   - localStorage was being updated with the OLD value from the reducer

**The issue**: `plugins/vuex-persist.js` reducer was persisting ALL state including `layout.offlineModeEnabled`, preventing the sync from taking effect permanently.

## Solution: 3-Part Fix

### 1. Exclude `offlineModeEnabled` from localStorage Persistence

**File: `plugins/vuex-persist.js`**

Added logic to exclude `layout.offlineModeEnabled` from the persistence reducer:

```javascript
// CRITICAL: Exclude offlineModeEnabled from persistence
// This must be determined at runtime from app.$config (set from OFFLINE_MODE env var)
// Persisting it causes stale values to override the runtime configuration
if (stateCopy.layout) {
  const { offlineModeEnabled, ...layoutPropertiesToPersist } =
    stateCopy.layout;
  stateCopy.layout = layoutPropertiesToPersist;
}
```

**Why**: `offlineModeEnabled` is not user-generated state, it's configuration. It must come from runtime environment variables, not localStorage.

### 2. Default Store to `false`

**File: `store/layout.js`**

Changed initial state to always default to `false`:

```javascript
offlineModeEnabled: false,  // Was: isOfflineModeEnabled()
```

**Why**: This ensures offline mode is "opt-in" rather than "opt-out". If `OFFLINE_MODE` env var is not set, it defaults to disabled.

### 3. Sync in Middleware (Already Fixed)

**File: `middleware/onload.js`**

The middleware already syncs the runtime config:

```javascript
const runtimeOfflineModeEnabled = app.$config?.offlineMode === true || false;
store.commit('layout/setOfflineModeEnabled', runtimeOfflineModeEnabled);
```

## Execution Flow After Fix

```
1. Page loads
   ↓
2. Store initializes: offlineModeEnabled = false (default)
   ↓
3. vuex-persist restores state from localStorage
   (offlineModeEnabled is now EXCLUDED, won't override)
   ↓
4. Router middleware runs: onload
   ↓
5. Middleware syncs: 
   app.$config.offlineMode (from OFFLINE_MODE env var)
   ↓ 
   store.commit('layout/setOfflineModeEnabled', runtimeValue)
   ↓
6. Component/middleware logic uses store.state.layout.offlineModeEnabled
   (Now correctly set from runtime config!)
   ↓
7. vuex-persist saves state (without offlineModeEnabled)
   ↓
8. API calls are made (or skipped) based on runtime config ✓
```

## Configuration Priority

The app now correctly follows this priority:

1. **Runtime Config** (`app.$config.offlineMode`) - PRIMARY SOURCE
   - Set in `nuxt.config.js` publicRuntimeConfig
   - Evaluated at runtime based on `process.env.OFFLINE_MODE`
   - Only `'true'` string enables offline mode
   - Injected into app context

2. **Store State** (`store.state.layout.offlineModeEnabled`) - SYNCHRONIZED COPY
   - Defaults to `false`
   - Synced with runtime config in onload middleware
   - Persisted to localStorage **without** the config value

3. **Fallback** - None needed, always has a value

## Files Modified

1. **`plugins/vuex-persist.js`**
   - Added reducer logic to exclude `layout.offlineModeEnabled`
   
2. **`store/layout.js`**
   - Changed default from `isOfflineModeEnabled()` to `false`

3. **`middleware/onload.js`** (Previously fixed)
   - Already syncs runtime config with store

4. **`nuxt.config.js`** (No changes needed)
   - Already correctly sets `publicRuntimeConfig.offlineMode`

## Testing the Fix

### In CI/CD Pipeline

Set `OFFLINE_MODE=false` and verify:

```bash
# Expected console output:
[onload middleware] SYNCED offlineModeEnabled: false ✓
[onload middleware] layout.offlineModeEnabled: false ✓
[onload middleware] app.$config.offlineMode: false ✓
[onload middleware] Dispatching actions - offline mode disabled ✓

# Expected behavior:
# ✓ No "Skipping dispatch" messages
# ✓ API calls are made to fetch assessments, attributes, etc.
# ✓ Loader is not stuck
```

### In Browser DevTools

1. Open Console
2. Look for `[onload middleware]` messages
3. Verify all three show `false`
4. Open Network tab
5. Verify API calls are being made

### Manual Offline Mode Test

```bash
# To enable offline mode for testing:
OFFLINE_MODE=true npm run build

# Expected console output:
[onload middleware] offlineModeEnabled: true ✓
[onload middleware] Skipping dispatch - offline mode enabled ✓
```

## Key Takeaways

- **Configuration != State**: Environment-driven configuration should not be persisted to localStorage
- **Plugin Load Order Matters**: vuex-persist runs early and can override later syncing
- **Explicit Defaults**: Always be explicit about defaults rather than computing them
- **Centralized Config**: All offline mode references should come from a single source (runtime config)

## Related Files

- `config/offline-mode.js` - Utility for offline mode checks
- `store/attributes.js` - Uses offline mode check in fetchAttributes action
- `store/assessments.js` - Uses offline mode check in fetchAssessments action
- `store/surveyquestions.js` - Uses offline mode check in fetchSurveyQuestions action
