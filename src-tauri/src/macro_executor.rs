use enigo::{
    Button, Coordinate,
    Direction::{Click, Press, Release},
    Enigo, Key, Keyboard, Mouse, Settings,
};
use std::fs::{File, OpenOptions};
use std::io::{BufRead, BufReader, Write};
use std::time;
use std::time::Instant;
use std::{collections::HashMap, thread, time::Duration};
#[derive(Debug)]
enum MacroCommand {
    Click(i32, i32),
    Wait(u64),
    Type(String),
    Key(String),
    Var(String, String),
}
fn parse_line(line: &str, vars: &HashMap<String, String>) -> Option<MacroCommand> {
    let line = line.trim();

    if line.contains('=') {
        let parts: Vec<&str> = line.split('=').map(|s| s.trim()).collect();
        return Some(MacroCommand::Var(
            parts[0].to_string(),
            parts[1].to_string(),
        ));
    }

    if line.starts_with("click") {
        let args = line.trim_start_matches("click(").trim_end_matches(")");
        let coords: Vec<&str> = args.split(',').map(|s| s.trim()).collect();
        let x = resolve(&coords[0], vars).parse().ok()?;
        let y = resolve(&coords[1], vars).parse().ok()?;
        return Some(MacroCommand::Click(x, y));
    }

    if line.starts_with("wait") {
        let ms = line
            .trim_start_matches("wait(")
            .trim_end_matches(")")
            .trim();
        let duration = resolve(ms, vars).parse().ok()?;
        return Some(MacroCommand::Wait(duration));
    }

    if line.starts_with("type") {
        let text = line
            .trim_start_matches("type(")
            .trim_end_matches(")")
            .trim_matches('"');
        return Some(MacroCommand::Type(text.to_string()));
    }

    if line.starts_with("key") {
        let key = line.trim_start_matches("key(").trim_end_matches(")").trim();
        return Some(MacroCommand::Key(key.to_string()));
    }

    None
}

fn wait(ms: u64) {
    thread::sleep(Duration::from_millis(ms));
}

fn resolve(value: &str, vars: &HashMap<String, String>) -> String {
    if vars.contains_key(value) {
        vars[value].clone()
    } else {
        value.to_string()
    }
}
#[tauri::command]
async fn execute_macro(commands: Vec<MacroCommand>) {
    let mut enigo = Enigo::new(&Settings::default()).unwrap();
    // Paste
    // let _ = enigo.key(Key::Control, Press);
    // enigo.key(Key::Unicode('v'), Click);
    // enigo.key(Key::Control, Release);
    // // Do things with the mouse
    // enigo.move_mouse(500, 200, Coordinate::Abs);
    // enigo.button(Button::Left, Press);
    // enigo.move_mouse(100, 100, Coordinate::Rel);
    // enigo.button(Button::Left, Release);
    // // Enter text
    // enigo.text("hello world");
    let mut vars = HashMap::new();
    for cmd in commands {
        match cmd {
            MacroCommand::Var(name, value) => {
                vars.insert(name, value);
            }
            MacroCommand::Click(x, y) => {
                print!("click: {x}:{y}");
                enigo.move_mouse(x, y, Coordinate::Abs);
                enigo.button(Button::Left, Click).unwrap();
            }
            MacroCommand::Wait(ms) => {
                println!("waiting...");
                thread::sleep(Duration::from_secs(3)); // Pauses for 3 seconds
                println!("end waiting.");
            }
            MacroCommand::Type(text) => {
                //key_sequence(enigo,text);
            }
            MacroCommand::Key(key) => {
                // You can map string to actual key codes here
                println!("Pressed key: {}", key);
            }
        }
    }
}
// fn key_sequence(enigo:Enigo,text:String){
//         for c in text.chars() {
//             <dyn enigo::Keyboard>::key_click(Key::Unicode(c));
//     }
// }

#[tauri::command]
pub async fn run_macro() {
    // let mut enigo = Enigo::new(&Settings::default()).unwrap();
    // let commands = vec![
    //     MacroCommand::Click(30, 30),
    //     MacroCommand::Wait(500),
    //     MacroCommand::Type("Hello, world!".to_string()),
    //     MacroCommand::Key("Enter".to_string()),
    // ];
    // execute_macro(commands);

    let mut commands = vec![];
    let path = "test.macroscript";

    // Try to open the file, create if it doesn't exist
    let file = OpenOptions::new()
        .read(true)
        .write(true)
        .create(true)
        .open(path)
        .expect("Failed to open or create file");

    let reader = BufReader::new(&file);

    let vars = HashMap::new(); // You can populate this as needed

    for line_result in reader.lines() {
        if let Ok(line) = line_result {
            if line.trim().is_empty() {
                continue; // Skip blank lines
            }

            if let Some(cmd) = parse_line(&line, &vars) {
                println!("Parsed: {:?}", cmd);
                commands.push(cmd);
            } else {
                println!("Unrecognized line: {}", line);
            }
        }
    }

    // Optional: Write a default line if file was empty
    let metadata = file.metadata().expect("Failed to get metadata");
    if metadata.len() == 0 {
        writeln!(&file, "wait(1000)").expect("Failed to write default command");
        println!("File was empty — added default command: wait(1000)");
    }
    execute_macro(commands).await;
}
