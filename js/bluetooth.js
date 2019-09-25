
const UUID_SERVICE_MIDI = '03b80e5a-ede8-4b33-a751-6ce34ec4c700';
const UUID_CHAR_MIDI = '7772e5db-3868-4112-a1a9-f2669d106bf3';
let MidiCharacteristic;
const buffer = new ArrayBuffer(16);
const lastvalues = {};

function connect(obj) {
    //const service_input = document.querySelector('#service_uuid').value;
    //const char_input = document.querySelector('#char_uuid').value;

    return navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [UUID_SERVICE_MIDI]
    })
        .then(device => {
        console.log('Connection.');

            obj.src = "img/connect_on.png";
            obj.title = device.name +" Connesso!";
    return device.gatt.connect();
})
.
    then(server => {
        console.log('Connected.');
        //handleConnection();
    return server.getPrimaryService(UUID_SERVICE_MIDI);
})
.
    then(service => {
        console.log('Service connected.'); 
    return service.getCharacteristic(UUID_CHAR_MIDI);
})
.
    then(characteristic => characteristic.startNotifications()
)
.
    then(characteristic => {
        characteristic.addEventListener('characteristicvaluechanged',
            handleCharacteristicValueChanged);
    console.log('Notifications have been started.');  
})
.
    catch(error => {console.log("error: ", error)
})
    ;
}

function handleConnection(){
    if($('.app_connect').length) $('.app_connect').hide();
    if($('.app_content').length) $('.app_content').show();
}


function getSensor(input) {
    var result = '';
    switch (input) {
        case 119:
            result = 'pulsante';
            break;
        case 118:
            result = 'doppioclick';
            break;
        case 117:
            result = 'rotella';
            break;
        case 60:
            result = 'p1';
            break;
        case 62:
            result = 'p2';
            break;
        case 64:
            result = 'p3';
            break;
        case 65:
            result = 'p4';
            break;
        case 67:
            result = 'p5';
            break;
        case 69:
            result = 'p6';
            break;
        case 71:
            result = 'p7';
            break;
        case 72:
            result = 'p8';
            break;
        case 102:
            result = 'i1';
            break;
        case 103:
            result = 'i2';
            break;
        case 104:
            result = 'i3';
            break;
        case 105:
            result = 'i4';
            break;
        case 106:
            result = 'i5';
            break;
        case 107:
            result = 'i6';
            break;
        case 108:
            result = 'i7';
            break;
        case 109:
            result = 'i8';
            break;
    }
    return result;
}

function getType(input) {
    var result = '';
    switch (input) {
        case -112:
            result = 'start';
            break;
        case -128:
            result = 'stop';
            break;
        case -96:
            result = 'data';
            break;
        case -80:
            result = 'rotella';
            break;
    }
    return result;
}

function getDirection(value) {
    if (lastvalues.rotella === undefined) {
        lastvalues.rotella = value;
        return '';
    }
    let result = '';
    const lastvalue = lastvalues.rotella;
    if (lastvalue == 127 && value == 0) {
        result = 'up';
    } else if (lastvalue == 0 && value == 127) {
        result = 'down';
    } else {
        if (lastvalue < value) {
            result = 'up';
        } else {
            result = 'down';
        }
    }
    lastvalues.rotella = value;
    return result;
}



function ClearLog() {
    document.querySelector('#terminal').innerHTML = "";
}

//  deprecated //
function StartNotifications() {
    /*
    tlog('Starting BLE Notifications...');
    document.querySelector('#startNotifications').innerHTML = 'FERMA';
    setTimeout(readingCycle(), 10);
    */
    return MidiCharacteristic.readValue()
        .then(value => {
        let strval = '';
    var i;
    for (i = 0; i < value.byteLength; i++) {
        strval += value.getInt8(i) + ' - ';
    }
    document.querySelector('#value').innerHTML = strval;
})
}

function readingCycle() {
    value = MidiCharacteristic.value;
    if (value !== null) {
        let strval = '';
        var i;
        for (i = 0; i < value.byteLength; i++) {
            strval += value.getInt8(i) + ' - ';
        }
        document.querySelector('#value').innerHTML = strval;
    }
}

function read(characteristic) {
    //document.querySelector('#startNotifications').disabled = false;
    tlog('Notifications have been started.');
    return characteristic.startNotifications()
        .then(char => {
        tlog('Listening....'
)
    ;
    characteristic.addEventListener('characteristicvaluechanged',
        handleCharacteristicValueChanged);
})
.
    catch(error => {
        tlog('Argh! ' +error
)
    ;
})
    ;
}