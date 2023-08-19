import { UnicoCheckBuilder, SelfieCameraTypes, UnicoThemeBuilder, UnicoConfig } from './UnicoCheckBuilder.min.js'

let host = window.location.hostname;
let config = null;

if (host == 'dev.widepay.com') {
    config = '{"project_info":{"project_number":"3777262724688960367547","project_id":"Wide Pay"},"client_info":{"mobilesdk_app_id":"3:394730:js","js_client_info":{"hostname":"dev.widepay.com"}},"host_info":{"host_info":"nRMqSJJeWMZ0K4n9Dxs/Zhb5RslAxes+pmH0gJgmVtZImMYBRmw3bx3E0ehCDJnY","host_key":"kr+DXcacEEZugVGL9Sg1rKBpLWIbecEejxbAn3OPfyrtFa5CbLErt3yU0FNU5BQy"}}';
} else if (host == 'www.widepay.com.br') {
    config = '{"project_info":{"project_number":"699654794298494170","project_id":"Wide Pay"},"client_info":{"mobilesdk_app_id":"3:714159:js","js_client_info":{"hostname":"www.widepay.com.br"}},"host_info":{"host_info":"Up4XTo9Enmc9krxVWOW2KkDIHFlJDv6AXGgf547UEGA=","host_key":"VzhxSn41Ol1mu7kx0mhqprOIUIQHrMWqxMauuXUYqft/vcjpS78GLjTzf3lw4/jH"}}';
} else {
    config = '{"project_info":{"project_number":"220205842671153458","project_id":"Wide Pay"},"client_info":{"mobilesdk_app_id":"3:394730:js","js_client_info":{"hostname":"www.widepay.com"}},"host_info":{"host_info":"Up4XTo9Enmc9krxVWOW2KkDIHFlJDv6AXGgf547UEGA=","host_key":"Xgq1C7ba3139jhHxwOMcXU1U6hFbTmDEvQO5pPoZ8J5MgIaDAAEtTtUO7afSDLfv"}}';
}

const debug = document.getElementById('debug');
debug.innerHTML += '<div>HOST: ' + host + '</div>';
debug.innerHTML += '<div>CONFIG: ' + config + '</div>';

config = JSON.parse(config);

const unicoConfig = new UnicoConfig();
unicoConfig.setProjectNumber(config.project_info.project_number);
unicoConfig.setProjectId(config.project_info.project_id);
unicoConfig.setMobileSdkAppId(config.client_info.mobilesdk_app_id);
unicoConfig.setHostname(config.client_info.js_client_info.hostname);
unicoConfig.setHostInfo(config.host_info.host_info);
unicoConfig.setHostKey(config.host_info.host_key);

const unicoTheme = new UnicoThemeBuilder().build();

const unicoCameraBuilder = new UnicoCheckBuilder();
unicoCameraBuilder.setResourceDirectory('/resources');
unicoCameraBuilder.setModelsPath('/models');
unicoCameraBuilder.setTheme(unicoTheme);

const unicoCamera = unicoCameraBuilder.build();

const cameraPromised = unicoCamera.prepareSelfieCamera(unicoConfig, SelfieCameraTypes.SMART);
cameraPromised.then(cameraOpener => cameraOpener.open({
    on: {
        success: function (obj) {

            console.log(obj)
            debug.innerHTML += '<div style="color: green;">SUCCESS: ' + JSON.stringify(obj) + '</div>';

        },
        error: function (err) {

            console.log(err)
            debug.innerHTML += '<div style="color: red;">ERROR: ' + err.message + '</div>';

        }
    }
})).catch((err) => {

    console.error(err);
    debug.innerHTML += '<div style="color: red;">ERROR: ' + err.message + '</div>';

});