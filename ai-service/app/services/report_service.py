from app.models.schemas import ReportResponse
class ReportService:
    @staticmethod
    def generate_report_from_template(inputs):
        institution = inputs.get('institution_name', 'Unknown')
        inspector = inputs.get('inspector_name', 'Unknown')
        risk = inputs.get('risk_score', 0)
        summary = f"Inspection report for {institution} conducted by {inspector}. "
        if risk > 70: summary += "High risk level. Immediate action recommended."
        elif risk > 40: summary += "Moderate risk. Some issues need attention."
        else: summary += "Low risk. Overall satisfactory."
        findings = inputs.get('ai_findings', []) or ["All checklist items passed."]
        violations = inputs.get('violations', [])
        recs = ["Conduct corrective actions"] if risk > 70 else ["Maintain current standards"]
        return {
            "summary": summary,
            "findings": findings,
            "violations": violations,
            "evidence_summary": inputs.get('evidence_summary', []),
            "risk_assessment": {"score": risk, "level": "HIGH" if risk > 70 else "LOW"},
            "recommendations": recs,
            "corrective_actions": [f"Fix {v['category']}" for v in violations if v.get('severity') in ['HIGH','CRITICAL']]
        }
