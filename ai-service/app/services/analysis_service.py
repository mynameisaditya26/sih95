import os
from PIL import Image
import io
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
