# 🎤 Voice-to-Text Setup for Cursor

Voice-to-text integration using OpenAI Whisper - now you can speak to Cursor instead of typing!

## ✅ What's Installed

- **Python 3.12.2** ✓
- **FFmpeg** ✓ (for audio processing)
- **OpenAI Whisper** ✓ (AI transcription)
- **Audio Recording Libraries** ✓ (sounddevice, scipy)
- **Clipboard Integration** ✓ (pyperclip)

## 🚀 Quick Start

### Method 1: Double-click the batch file
```
voice.bat
```
Just double-click `voice.bat` in your file explorer for instant voice-to-text!

### Method 2: Run PowerShell script
```powershell
.\voice.ps1
```
More advanced options and better UI.

### Method 3: Direct Python command
```bash
python voice_to_text.py -c -d 10
```
Direct control with all options.

## 🎯 How to Test

**Right now, try this:**

1. **Double-click `voice.bat`** in your file explorer
2. When prompted, press any key to start recording
3. **Speak clearly for 10 seconds** (try saying: "Hello this is a test of voice to text functionality in Cursor")
4. Wait for transcription (will download model on first use)
5. **Paste (Ctrl+V) in Cursor** - the text should appear!

## 📋 Usage Options

### Basic Usage
- `voice.bat` - Quick 10-second recording → clipboard
- `.\voice.ps1` - PowerShell version with better UI

### Advanced Options
```bash
# Record for 15 seconds
python voice_to_text.py -c -d 15

# Use faster/smaller model for speed
python voice_to_text.py -c -m tiny

# Use larger model for accuracy
python voice_to_text.py -c -m large

# Save to file instead of clipboard
python voice_to_text.py -o my_transcription.txt

# Transcribe existing audio file
python voice_to_text.py --no-record existing_audio.wav -c
```

### Model Sizes (Speed vs Accuracy)
- `tiny` - Fastest, least accurate
- `base` - Good balance (default)
- `small` - Better accuracy
- `medium` - High accuracy
- `large` - Best accuracy, slowest

## 🔧 Workflow Integration

### For Cursor Coding
1. **Start voice recording**: `voice.bat` or `.\voice.ps1`
2. **Speak your code/instructions**: "Create a function that calculates the fibonacci sequence"
3. **Paste into Cursor**: Ctrl+V
4. **Continue coding** with voice commands!

### For Documentation
1. **Record longer sessions**: `python voice_to_text.py -c -d 30`
2. **Speak your documentation**
3. **Paste and edit** in Cursor

## 🛠️ Troubleshooting

### If whisper command not found:
The user installation path might not be in PATH. Use the full Python approach:
```bash
python voice_to_text.py
```

### If microphone issues:
Check Windows microphone permissions and default recording device.

### First run is slow:
Whisper downloads the AI model on first use (~150MB for base model). Subsequent runs are much faster.

## 🎮 Advanced: Create Hotkey

You can set up a Windows hotkey to trigger voice-to-text:

1. Right-click `voice.bat` → Create Shortcut
2. Right-click shortcut → Properties
3. Set "Shortcut key" (e.g., Ctrl+Alt+V)
4. Now press your hotkey anywhere to start voice recording!

## 📝 Files Created

- `voice_to_text.py` - Main Python script
- `voice.bat` - Windows batch file for quick access
- `voice.ps1` - PowerShell script with enhanced UI
- `VOICE_SETUP_README.md` - This file

## 🚨 Test Your Setup NOW!

**To test everything is working:**

1. Double-click `voice.bat`
2. Say: "This is a test of the voice to text system"
3. Check if text appears in clipboard
4. Paste (Ctrl+V) into Cursor chat or any text field

If this works, you're all set! 🎉 