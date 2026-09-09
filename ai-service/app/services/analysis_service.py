import os
from PIL import Image
import io
import random

class AnalysisService:
    @staticmethod
    async def analyze_image(image_bytes: bytes, filename: str):
        # Mock implementation – clearly labelled as demo
        try:
            img = Image.open(io.BytesIO(image_bytes))
            width, height = img.size
        except:
            width, height = 0, 0
        findings = ["**DEMO** This analysis is simulated."]
        detected = []
        if width < 800 or height < 600:
            detected.append("Low resolution may obscure details.")
        return {
            "findings": findings,
            "detectedIssues": detected,
            "confidence": 0.75,
            "recommendations": ["No immediate issues detected."] if not detected else ["Inspect area for safety."]
        }

    @staticmethod
    async def analyze_video(video_bytes: bytes, filename: str):
        """
        Mock video anomaly analysis for SIH demo.
        Returns structured findings that the frontend / backend can display.
        """
        # Deterministic-ish variety based on filename for stable demos
        name = (filename or "").lower()
        templates = [
            {
                "type": "Empty Classroom / Low Attendance",
                "severity": "HIGH",
                "confidence": 0.91,
                "findings": [
                    "**DEMO** Simulated video analysis.",
                    "Student count in frames significantly below registered attendance.",
                    "Multiple empty desks detected across consecutive sampled frames.",
                    "Possible attendance padding or proxy attendance.",
                ],
                "detectedIssues": [
                    "Low occupancy vs claimed attendance",
                    "Timestamp / session mismatch signals",
                ],
                "recommendations": [
                    "Trigger surprise physical verification.",
                    "Cross-check biometric / digital attendance logs.",
                    "Notify District Authority.",
                ],
            },
            {
                "type": "Unauthorized Activity / Facility Misuse",
                "severity": "HIGH",
                "confidence": 0.87,
                "findings": [
                    "**DEMO** Simulated video analysis.",
                    "Non-program related activity detected during claimed operational hours.",
                    "Objects and posture patterns indicate possible commercial use.",
                ],
                "detectedIssues": [
                    "Non-beneficiary individuals present",
                    "Activity inconsistent with scheme guidelines",
                ],
                "recommendations": [
                    "Schedule immediate surprise inspection.",
                    "Request CCTV archive for last 7 days.",
                    "Freeze next tranche pending verification.",
                ],
            },
            {
                "type": "No Significant Anomaly Detected",
                "severity": "LOW",
                "confidence": 0.76,
                "findings": [
                    "**DEMO** Simulated video analysis.",
                    "Video content consistent with expected program activity.",
                    "Occupancy and staff presence within normal range.",
                ],
                "detectedIssues": [],
                "recommendations": [
                    "No immediate action required.",
                    "Continue routine monitoring.",
                ],
            },
        ]

        if "empty" in name or "absent" in name or "low" in name:
            result = templates[0]
        elif "misuse" in name or "unauthorized" in name:
            result = templates[1]
        else:
            result = templates[len(name) % len(templates)]

        return {
            "findings": result["findings"],
            "detectedIssues": result["detectedIssues"],
            "confidence": result["confidence"],
            "recommendations": result["recommendations"],
            "anomalyType": result["type"],
            "severity": result["severity"],
        }