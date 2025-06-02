@echo off
REM Voice-to-Text Quick Script for Cursor
REM Records 10 seconds of audio, transcribes with Whisper, and copies to clipboard

echo.
echo ================================================
echo 🎤 VOICE-TO-TEXT FOR CURSOR
echo ================================================
echo.
echo This will:
echo - Record 10 seconds of audio
echo - Transcribe using Whisper
echo - Copy result to clipboard
echo - You can then paste into Cursor!
echo.
echo Press Ctrl+C to cancel, or any key to start...
pause >nul

python voice_to_text.py -c -d 10

echo.
echo ================================================
echo ✅ DONE! Text copied to clipboard.
echo Now you can paste (Ctrl+V) in Cursor!
echo ================================================
pause 