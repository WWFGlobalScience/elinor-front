<template>
  <header class="header--map header--map--flexy">
    <div class="container--lg">
      <div class="left">
        <p>{{ $t('managementarea.map.boundaries') }}</p>
        <p>{{ $t('managementarea.map.tools') }}</p>
      </div>
      <div class="right">
        <ul>
          <li>
            <div class="pic__wrap">
              <img src="~/assets/img/ico-map-pointer.svg" />
            </div>
            <span>{{ $t('managementarea.map.polygon_create') }}</span>
          </li>
          <li>
            <div class="pic__wrap">
              <img src="~/assets/img/ico-map-closer.svg" />
            </div>
            <span>{{ $t('managementarea.map.polygon_close') }}</span>
          </li>
          <li>
            <div class="pic__wrap">
              <img
                src='data:image/svg+xml;utf8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="20" height="20">%3Cpath d="m15 12.3v-4.6c.6-.3 1-1 1-1.7 0-1.1-.9-2-2-2-.7 0-1.4.4-1.7 1h-4.6c-.3-.6-1-1-1.7-1-1.1 0-2 .9-2 2 0 .7.4 1.4 1 1.7v4.6c-.6.3-1 1-1 1.7 0 1.1.9 2 2 2 .7 0 1.4-.4 1.7-1h4.6c.3.6 1 1 1.7 1 1.1 0 2-.9 2-2 0-.7-.4-1.4-1-1.7zm-8-.3v-4l1-1h4l1 1v4l-1 1h-4z"/>%3C/svg>'
                alt=""
              />
            </div>
            <span>{{ $t('managementarea.map.polygon_new') }}</span>
          </li>
          <li>
            <div class="pic__wrap">
              <img
                src='data:image/svg+xml;utf8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="20" height="20">%3Cpath d="M10,3.4 c-0.8,0-1.5,0.5-1.8,1.2H5l-1,1v1h12v-1l-1-1h-3.2C11.5,3.9,10.8,3.4,10,3.4z M5,8v7c0,1,1,2,2,2h6c1,0,2-1,2-2V8h-2v5.5h-1.5V8h-3 v5.5H7V8H5z"/>%3C/svg>'
                alt=""
              />
            </div>
            <span>{{ $t('managementarea.map.polygon_delete') }}</span>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'map-header-edit',
};
</script>
