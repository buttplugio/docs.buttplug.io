use buttplug_client::{
  ButtplugClient,
  connector::ButtplugRemoteClientConnector,
  serializer::ButtplugClientJSONSerializer,
};
use buttplug_core::message::{InputType, OutputType};
use buttplug_transport_websocket_tungstenite::ButtplugWebsocketClientTransport;
use strum::IntoEnumIterator;
use tokio::io::{self, AsyncBufReadExt, BufReader};

async fn wait_for_input() {
  BufReader::new(io::stdin())
    .lines()
    .next_line()
    .await
    .unwrap();
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
  let connector = ButtplugRemoteClientConnector::<
    ButtplugWebsocketClientTransport,
    ButtplugClientJSONSerializer,
  >::new(ButtplugWebsocketClientTransport::new_insecure_connector(
    "ws://127.0.0.1:12345",
  ));

  let client = ButtplugClient::new("Device Info Example");
  client.connect(connector).await?;

  // Scan for devices
  client.start_scanning().await?;
  println!("Scanning for devices. Press Enter when ready...");
  wait_for_input().await;
  client.stop_scanning().await?;

  // Iterate through all connected devices
  for (_, device) in client.devices() {
    println!("\n=== Device: {} ===", device.name());
    println!("Index: {}", device.index());
    println!("Display Name: {:?}", device.display_name());

    // Get all features for this device
    let features = device.device_features();

    println!("\nFeatures ({} total):", features.len());
    for (feature_index, feature) in features {
      let feature_def = feature.feature();
      println!("\n  Feature {}:", feature_index);
      println!("    Description: {:?}", feature_def.description());
      println!("    Type: {:?}", feature_def.feature_type());

      // Check for outputs (things the device can do)
      if let Some(output) = feature_def.output() {
        println!("    Outputs:");
        for output_type in OutputType::iter() {
          if output.contains(output_type) {
            println!("      - {:?} (steps: {:?})", output_type, output.steps());
          }
        }
      }

      // Check for inputs (things the device can sense)
      if let Some(input) = feature_def.input() {
        println!("    Inputs:");
        for input_type in InputType::iter() {
          if input.contains(input_type) {
            println!("      - {:?}", input_type);
          }
        }
      }
    }

    // Convenience methods for checking specific capabilities
    println!("\nCapability summary:");
    let vibrate_features = device.vibrate_features();
    if !vibrate_features.is_empty() {
      println!("  - {} vibrator(s)", vibrate_features.len());
    }
    let rotate_features = device.rotate_features();
    if !rotate_features.is_empty() {
      println!("  - {} rotator(s)", rotate_features.len());
    }
    let linear_features = device.linear_features();
    if !linear_features.is_empty() {
      println!("  - {} linear actuator(s)", linear_features.len());
    }
  }

  println!("\nPress Enter to disconnect...");
  wait_for_input().await;
  client.disconnect().await?;

  Ok(())
}
