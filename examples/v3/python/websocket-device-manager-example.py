import asyncio
import json
import websockets
import time

# Since we're emulating Lovense here, we need our address to be similar to what the DeviceInfo;
# command will return. We'll use this for both our initial device creation as well as our Lovense
# initialization response.
DEVICE_ADDRESS = "8A3D9FAC2A45"

async def main():
  # We'll assume that we're going to connect to a local Buttplug WSDM, so that'll be on port 54817.
  async with websockets.connect(uri = "ws://127.0.0.1:54817", ping_interval = 0.5) as ws:
    print("Connected")
    # Since we're emulating Lovense here, we need our address to be 
    await ws.send(json.dumps({ "identifier": "LVSDevice", "address": DEVICE_ADDRESS, "version": 0}))
    print("Handshake sent")
    # From here on out, we'll do two things, both triggered by receiving packets
    # - If we get a vibrate command, just print
    # - If we get a battery reading request, print and send back 100%. Not like this python script
    #   is on a battery, right?
    while True:
      # This will throw when we disconnect, which will break us out of the while loop anyways
      packet: str = (await ws.recv()).decode("utf-8")
      print(f"Got packet: {packet}")
      if packet.startswith("DeviceType;"):
        print(f"Got Device Type Request")
        # DeviceType; wants a return that looks like:
        #
        # [identifier]:[bluetooth device address with no colons]:[firmware version]
        #
        # Buttplug only uses the identifier part, but since we're trying to act like a device, we
        # fill in the whole thing.
        await ws.send(bytes(f"Z:{DEVICE_ADDRESS}:10", "utf-8"))
      elif packet.startswith("Vibrate:"):
        # Vibrate requests for Lovense are of the form
        #
        # "Vibrate:10;"
        #
        # The value will be between 0-20
        print(f"Got Vibrate Request: {packet}")
      elif packet.startswith("Battery"):
        print(f"Got Battery Query")
        # Lovense encodes its own battery command instead of using the BLE characteristic. Expected
        # return is just a number between 0-100, followed by a semicolon.
        await ws.send(bytes("90;", "utf-8"))

asyncio.run(main())