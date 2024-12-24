// vite.config.ts
import legacy from "file:///d:/CHAMA/Coding_ZONE/Ionic%20Lab/App%20Ionic%20game/card_game/brunchiegame/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import react from "file:///D:/CHAMA/Coding_ZONE/Ionic%20Lab/App%20Ionic%20game/card_game/brunchiegame/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { ViteImageOptimizer } from "file:///D:/CHAMA/Coding_ZONE/Ionic%20Lab/App%20Ionic%20game/card_game/brunchiegame/node_modules/vite-plugin-image-optimizer/dist/index.mjs";
import { defineConfig } from "file:///D:/CHAMA/Coding_ZONE/Ionic%20Lab/App%20Ionic%20game/card_game/brunchiegame/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    legacy(),
    ViteImageOptimizer({
      /* pass your config */
      svg: {
        multipass: true,
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                cleanupNumericValues: false,
                removeViewBox: false
                // https://github.com/svg/svgo/issues/1128
              },
              cleanupIDs: {
                minify: true,
                remove: true
              },
              convertPathData: false
            }
          }
        ]
      },
      png: {
        // https://sharp.pixelplumbing.com/api-output#png
        quality: 50
      },
      jpeg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 50
      },
      jpg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 50
      },
      cache: false,
      cacheLocation: void 0
    })
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://brunchtime.org/wp-json/api/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
        // remove /api prefix when forwarding
      }
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJkOlxcXFxDSEFNQVxcXFxDb2RpbmdfWk9ORVxcXFxJb25pYyBMYWJcXFxcQXBwIElvbmljIGdhbWVcXFxcY2FyZF9nYW1lXFxcXGJydW5jaGllZ2FtZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiZDpcXFxcQ0hBTUFcXFxcQ29kaW5nX1pPTkVcXFxcSW9uaWMgTGFiXFxcXEFwcCBJb25pYyBnYW1lXFxcXGNhcmRfZ2FtZVxcXFxicnVuY2hpZWdhbWVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2Q6L0NIQU1BL0NvZGluZ19aT05FL0lvbmljJTIwTGFiL0FwcCUyMElvbmljJTIwZ2FtZS9jYXJkX2dhbWUvYnJ1bmNoaWVnYW1lL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IGxlZ2FjeSBmcm9tICdAdml0ZWpzL3BsdWdpbi1sZWdhY3knXHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcclxuaW1wb3J0IHsgVml0ZUltYWdlT3B0aW1pemVyIH0gZnJvbSAndml0ZS1wbHVnaW4taW1hZ2Utb3B0aW1pemVyJztcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIGxlZ2FjeSgpLFxyXG4gICAgVml0ZUltYWdlT3B0aW1pemVyKHtcclxuICAgICAgLyogcGFzcyB5b3VyIGNvbmZpZyAqL1xyXG4gICAgICBzdmc6IHtcclxuICAgICAgICBtdWx0aXBhc3M6IHRydWUsXHJcbiAgICAgICAgcGx1Z2luczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAncHJlc2V0LWRlZmF1bHQnLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICBvdmVycmlkZXM6IHtcclxuICAgICAgICAgICAgICAgIGNsZWFudXBOdW1lcmljVmFsdWVzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHJlbW92ZVZpZXdCb3g6IGZhbHNlLCAvLyBodHRwczovL2dpdGh1Yi5jb20vc3ZnL3N2Z28vaXNzdWVzLzExMjhcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGNsZWFudXBJRHM6IHtcclxuICAgICAgICAgICAgICAgIG1pbmlmeTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHJlbW92ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGNvbnZlcnRQYXRoRGF0YTogZmFsc2UsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgICAgcG5nOiB7XHJcbiAgICAgICAgLy8gaHR0cHM6Ly9zaGFycC5waXhlbHBsdW1iaW5nLmNvbS9hcGktb3V0cHV0I3BuZ1xyXG4gICAgICAgIHF1YWxpdHk6IDUwLFxyXG4gICAgICB9LFxyXG4gICAgICBqcGVnOiB7XHJcbiAgICAgICAgLy8gaHR0cHM6Ly9zaGFycC5waXhlbHBsdW1iaW5nLmNvbS9hcGktb3V0cHV0I2pwZWdcclxuICAgICAgICBxdWFsaXR5OiA1MCxcclxuICAgICAgfSxcclxuICAgICAganBnOiB7XHJcbiAgICAgICAgLy8gaHR0cHM6Ly9zaGFycC5waXhlbHBsdW1iaW5nLmNvbS9hcGktb3V0cHV0I2pwZWdcclxuICAgICAgICBxdWFsaXR5OiA1MCxcclxuICAgICAgfSxcclxuICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICBjYWNoZUxvY2F0aW9uOiB1bmRlZmluZWQsXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIHNlcnZlcjoge1xyXG4gICAgcHJveHk6IHtcclxuICAgICAgJy9hcGknOiB7XHJcbiAgICAgICAgdGFyZ2V0OiAnaHR0cHM6Ly9icnVuY2h0aW1lLm9yZy93cC1qc29uL2FwaS92MScsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJyksIC8vIHJlbW92ZSAvYXBpIHByZWZpeCB3aGVuIGZvcndhcmRpbmdcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICB0ZXN0OiB7XHJcbiAgICBnbG9iYWxzOiB0cnVlLFxyXG4gICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXHJcbiAgICBzZXR1cEZpbGVzOiAnLi9zcmMvc2V0dXBUZXN0cy50cycsXHJcbiAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtaLE9BQU8sWUFBWTtBQUNyYSxPQUFPLFdBQVc7QUFDbEIsU0FBUywwQkFBMEI7QUFDbkMsU0FBUyxvQkFBb0I7QUFHN0IsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLElBQ1AsbUJBQW1CO0FBQUE7QUFBQSxNQUVqQixLQUFLO0FBQUEsUUFDSCxXQUFXO0FBQUEsUUFDWCxTQUFTO0FBQUEsVUFDUDtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sUUFBUTtBQUFBLGNBQ04sV0FBVztBQUFBLGdCQUNULHNCQUFzQjtBQUFBLGdCQUN0QixlQUFlO0FBQUE7QUFBQSxjQUNqQjtBQUFBLGNBQ0EsWUFBWTtBQUFBLGdCQUNWLFFBQVE7QUFBQSxnQkFDUixRQUFRO0FBQUEsY0FDVjtBQUFBLGNBQ0EsaUJBQWlCO0FBQUEsWUFDbkI7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLEtBQUs7QUFBQTtBQUFBLFFBRUgsU0FBUztBQUFBLE1BQ1g7QUFBQSxNQUNBLE1BQU07QUFBQTtBQUFBLFFBRUosU0FBUztBQUFBLE1BQ1g7QUFBQSxNQUNBLEtBQUs7QUFBQTtBQUFBLFFBRUgsU0FBUztBQUFBLE1BQ1g7QUFBQSxNQUNBLE9BQU87QUFBQSxNQUNQLGVBQWU7QUFBQSxJQUNqQixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsU0FBUyxDQUFDLFNBQVMsS0FBSyxRQUFRLFVBQVUsRUFBRTtBQUFBO0FBQUEsTUFDOUM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBTTtBQUFBLElBQ0osU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IsWUFBWTtBQUFBLEVBQ2Q7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
