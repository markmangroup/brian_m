# Voice-to-Text Script for Cursor Integration
# PowerShell version with enhanced UI

param(
    [int]$Duration = 10,
    [string]$Model = "base",
    [switch]$Help
)

if ($Help) {
    Write-Host @"
🎤 Voice-to-Text for Cursor

Usage: .\voice.ps1 [-Duration <seconds>] [-Model <size>] [-Help]

Parameters:
  -Duration    Recording duration in seconds (default: 10)
  -Model       Whisper model size: tiny, base, small, medium, large (default: base)
  -Help        Show this help message

Examples:
  .\voice.ps1                    # Record 10 seconds with base model
  .\voice.ps1 -Duration 15       # Record 15 seconds
  .\voice.ps1 -Model small       # Use small model for faster processing
"@
    exit
}

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "🎤 VOICE-TO-TEXT FOR CURSOR" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Configuration:" -ForegroundColor Green
Write-Host "  Duration: $Duration seconds" -ForegroundColor White
Write-Host "  Model: $Model" -ForegroundColor White
Write-Host ""
Write-Host "This will:" -ForegroundColor Green
Write-Host "  ✓ Record $Duration seconds of audio" -ForegroundColor White
Write-Host "  ✓ Transcribe using Whisper ($Model model)" -ForegroundColor White
Write-Host "  ✓ Copy result to clipboard" -ForegroundColor White
Write-Host "  ✓ Ready to paste into Cursor!" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Press Enter to start recording, or 'q' to quit"
if ($choice -eq 'q') {
    Write-Host "❌ Cancelled by user" -ForegroundColor Red
    exit
}

try {
    # Run the Python script
    python voice_to_text.py -c -d $Duration -m $Model
    
    Write-Host ""
    Write-Host "================================================" -ForegroundColor Green
    Write-Host "✅ SUCCESS! Text copied to clipboard." -ForegroundColor Yellow
    Write-Host "Now paste (Ctrl+V) into Cursor!" -ForegroundColor Green
    Write-Host "================================================" -ForegroundColor Green
    
} catch {
    Write-Host ""
    Write-Host "❌ Error occurred: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Make sure Python and dependencies are installed." -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Press Enter to close" 