# Possible Kiss

## Bluetooth Details

**BLE Device Name**
```
RS-KNW
```

**Service UUID**
```
0000cb60-0000-1000-8000-00805f9b34fb
```

**Command (Tx) Characteristic UUID**
```
0000cb61-0000-1000-8000-00805f9b34fb
```

**Read/Notify (Rx) Characteristic UUID**
```
0000cb62-0000-1000-8000-00805f9b34fb
```

## Rx Protocol

- Battery: [ 0x55, 0x80, 0x__, 0x__, 0x__, 0xXX ] 
  - XX is the % battery (8-bit)
- Pressure: [ 0x55, 0x91, 0x__, 0x__, 0xXX, 0xXX ]
  - XXXX is the pressure level (16-bit)

## Tx Protocol

- Info: [ 0xAA, 0x00, 0x00, 0x00, 0x00, 0x00 ]
- Kiss (momentary): [ 0xAA, 0x02, 0xXX, 0x00, 0x00, 0xYY ]
  - XX=00 oscillate+vibrate 01=vibrate, 02=oscillate
  - YY is intensity 0-64
