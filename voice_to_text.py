#!/usr/bin/env python3
"""
Voice-to-Text Script for Cursor Integration
Records audio, transcribes with Whisper, and outputs to clipboard/file.
"""

import whisper
import sounddevice as sd
import numpy as np
import scipy.io.wavfile
import os
import sys
import argparse
import pyperclip
from datetime import datetime

# Configuration
DEFAULT_DURATION = 10  # seconds
OUTPUT_WAV = "voice_input.wav"
SAMPLE_RATE = 44100

def record_audio(duration=DEFAULT_DURATION):
    """Record audio for specified duration."""
    print(f"🎤 Recording for {duration} seconds... (Speak now!)")
    
    # Record audio
    recording = sd.rec(int(duration * SAMPLE_RATE), 
                      samplerate=SAMPLE_RATE, 
                      channels=1, 
                      dtype='int16')
    sd.wait()  # Wait until recording is finished
    
    # Save to WAV file
    scipy.io.wavfile.write(OUTPUT_WAV, SAMPLE_RATE, recording)
    print("✅ Recording complete!")
    return OUTPUT_WAV

def transcribe_audio(audio_file, model_size="base", language="english"):
    """Transcribe audio file using Whisper."""
    print(f"🧠 Loading Whisper model '{model_size}'...")
    
    # Load model (will download on first use)
    model = whisper.load_model(model_size)
    
    print("📝 Transcribing audio...")
    result = model.transcribe(audio_file, language=language)
    
    return result["text"].strip()

def save_to_file(text, filename=None):
    """Save transcribed text to a file."""
    if not filename:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"transcription_{timestamp}.txt"
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(text)
    
    print(f"💾 Saved to: {filename}")
    return filename

def copy_to_clipboard(text):
    """Copy text to clipboard."""
    try:
        pyperclip.copy(text)
        print("📋 Copied to clipboard!")
        return True
    except Exception as e:
        print(f"⚠️  Could not copy to clipboard: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description="Voice-to-Text with Whisper")
    parser.add_argument("-d", "--duration", type=int, default=DEFAULT_DURATION,
                       help=f"Recording duration in seconds (default: {DEFAULT_DURATION})")
    parser.add_argument("-m", "--model", default="base",
                       choices=["tiny", "base", "small", "medium", "large"],
                       help="Whisper model size (default: base)")
    parser.add_argument("-l", "--language", default="english",
                       help="Language for transcription (default: english)")
    parser.add_argument("-o", "--output", help="Output file path")
    parser.add_argument("-c", "--clipboard", action="store_true",
                       help="Copy result to clipboard")
    parser.add_argument("--no-record", help="Skip recording, transcribe existing file")
    
    args = parser.parse_args()
    
    try:
        # Record or use existing audio file
        if args.no_record:
            if not os.path.exists(args.no_record):
                print(f"❌ File not found: {args.no_record}")
                return 1
            audio_file = args.no_record
        else:
            audio_file = record_audio(args.duration)
        
        # Transcribe
        text = transcribe_audio(audio_file, args.model, args.language)
        
        # Output results
        print("\n" + "="*50)
        print("📄 TRANSCRIPTION:")
        print("="*50)
        print(text)
        print("="*50)
        
        # Save to file if requested
        if args.output:
            save_to_file(text, args.output)
        
        # Copy to clipboard if requested
        if args.clipboard:
            copy_to_clipboard(text)
        
        # Clean up temporary audio file (if we recorded it)
        if not args.no_record and os.path.exists(OUTPUT_WAV):
            os.remove(OUTPUT_WAV)
        
        return 0
        
    except KeyboardInterrupt:
        print("\n❌ Interrupted by user")
        return 1
    except Exception as e:
        print(f"❌ Error: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main()) 