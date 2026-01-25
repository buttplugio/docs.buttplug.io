// Buttplug C# - Device Info Example
//
// This example demonstrates how to query device capabilities,
// including features, outputs, and inputs.

using Buttplug.Client;
using Buttplug.Core.Messages;

var client = new ButtplugClient("Device Info Example");

// Connect and scan for devices
Console.WriteLine("Connecting...");
await client.ConnectAsync("ws://127.0.0.1:12345");
Console.WriteLine("Connected! Scanning for devices...");

await client.StartScanningAsync();
Console.WriteLine("Turn on a device, then press Enter...");
Console.ReadLine();
await client.StopScanningAsync();

// Iterate through all connected devices
foreach (var device in client.Devices)
{
    Console.WriteLine($"\n=== Device: {device.Name} ===");
    Console.WriteLine($"Index: {device.Index}");
    Console.WriteLine($"Display Name: {device.DisplayName}");

    // Iterate through all features on this device
    Console.WriteLine($"\nFeatures ({device.Features.Count} total):");
    foreach (var feature in device.Features.Values)
    {
        Console.WriteLine($"\n  Feature {feature.FeatureIndex}:");
        Console.WriteLine($"    Description: {feature.FeatureDescriptor}");

        // Check for outputs (things the device can do)
        var outputs = feature.FeatureDefinition.Output;
        if (outputs != null && outputs.Count > 0)
        {
            Console.WriteLine("    Outputs:");
            foreach (var outputType in outputs)
            {
                var steps = feature.FeatureDefinition.OutputSteps;
                Console.WriteLine($"      - {outputType} (steps: {steps})");
            }
        }

        // Check for inputs (things the device can sense)
        var inputs = feature.FeatureDefinition.Input;
        if (inputs != null && inputs.Count > 0)
        {
            Console.WriteLine("    Inputs:");
            foreach (var inputType in inputs)
            {
                Console.WriteLine($"      - {inputType}");
            }
        }
    }

    // Use convenience methods to check specific capabilities
    Console.WriteLine("\nCapability summary:");

    if (device.HasOutput(OutputType.Vibrate))
    {
        var vibrateFeatures = device.GetFeaturesWithOutput(OutputType.Vibrate).ToList();
        Console.WriteLine($"  - {vibrateFeatures.Count} vibrator(s)");
    }

    if (device.HasOutput(OutputType.Rotate))
    {
        var rotateFeatures = device.GetFeaturesWithOutput(OutputType.Rotate).ToList();
        Console.WriteLine($"  - {rotateFeatures.Count} rotator(s)");
    }

    if (device.HasOutput(OutputType.Position))
    {
        var positionFeatures = device.GetFeaturesWithOutput(OutputType.Position).ToList();
        Console.WriteLine($"  - {positionFeatures.Count} linear actuator(s)");
    }

    if (device.HasInput(InputType.Battery))
    {
        Console.WriteLine("  - Battery level sensor");
    }

    if (device.HasInput(InputType.RSSI))
    {
        Console.WriteLine("  - Signal strength (RSSI) sensor");
    }
}

Console.WriteLine("\nPress Enter to disconnect...");
Console.ReadLine();

await client.DisconnectAsync();
Console.WriteLine("Disconnected.");
