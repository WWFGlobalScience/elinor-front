import { isOfflineModeEnabled } from '~/config/offline-mode';

const VALIDATION_STATUSES = [400, 422];

export function isValidationError(error) {
  const status = error && error.response && error.response.status;
  return VALIDATION_STATUSES.includes(status);
}

export function getApiErrorTextKey(error, offlineModeEnabled) {
  if (!error || !error.response) {
    return offlineModeEnabled
      ? 'default.error.offlineMode'
      : 'default.error.network';
  }

  const status = error.response.status;

  if (status === 403) return 'default.error.forbidden';
  if (status === 404) return 'default.error.notFound';
  if (status === 409) return 'default.error.conflict';
  if (status === 429) return 'default.error.tooManyRequests';
  if (status >= 500) {
    return offlineModeEnabled
      ? 'default.error.offlineMode'
      : 'default.error.serverError';
  }

  return 'default.error.text';
}

export function toastApiError(ctx, error) {
  if (!error || error._toastShown) return;
  error._toastShown = true;

  const toast = ctx && (ctx.$toast || (ctx.app && ctx.app.$toast));
  const i18n = ctx && (ctx.$i18n || ctx.i18n || (ctx.app && ctx.app.i18n));
  if (!toast || !i18n) return;

  const offlineModeEnabled = isOfflineModeEnabled((ctx && ctx.app) || ctx);
  toast.error(i18n.t(getApiErrorTextKey(error, offlineModeEnabled)));
}
