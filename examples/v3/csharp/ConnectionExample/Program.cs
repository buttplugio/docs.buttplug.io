using System;
using System.Threading.Tasks;
using Buttplug.Core;
using Buttplug.Client;

namespace ConnectionExample
{
    class Program
    {
        // Waits for the user to hit a key, so they can read whatever log
        // messages might have been printed.
        private static async Task WaitForKey()
        {
            Console.WriteLine("Press any key to continue.");
            while (!Console.KeyAvailable)
            {
                await Task.Delay(1);
            }
            Console.ReadKey(true);
        }

        private static async Task RunExample()
        {
            // First, we create our Client
            var client = new ButtplugClient("Example Client");

            // After you've created a connector, the connection looks the same no
            // matter what, though the errors thrown may be different.
            var connector = new ButtplugWebsocketConnector(new Uri("ws://127.0.0.1:12345"));

            // Now we connect. If anything goes wrong here, we'll either throw
            //
            // - A ButtplugClientConnectionException if there's a problem with
            //   the Connector, like the network address being wrong, server not
            //   being up, etc.
            // - A ButtplugHandshakeException if there is a client/server version
            //   mismatch.
            try
            {
                await client.ConnectAsync(connector);
            }
            catch (ButtplugClientConnectorException ex)
            {
                // If our connection failed, because the server wasn't turned on,
                // SSL/TLS wasn't turned off, etc, we'll just print and exit
                // here. This will most likely be a wrapped exception.
                Console.WriteLine(
                    $"Can't connect, exiting! Message: {ex.InnerException.Message}");
                await WaitForKey();
                return;
            }
            catch (ButtplugHandshakeException ex)
            {
                // This means our client is newer than our server, and we need to
                // upgrade the server we're connecting to.
                Console.WriteLine(
                    $"Handshake issue, exiting! Message: {ex.InnerException.Message}");
                await WaitForKey();
                return;
            }

            // We're connected, yay!
            Console.WriteLine("Connected! Check Server for Client Name.");

            await WaitForKey();

            // And now we disconnect as usual
            await client.DisconnectAsync();
        }

        private static void Main()
        {
            RunExample().Wait();
        }
    }
}
