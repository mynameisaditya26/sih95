from app.models.schemas import RiskScoreResponse, ComplianceScoreResponse
class RiskService:
    @staticmethod
    def calculate_risk_score(inputs):
        prev_compliance = inputs.get('previous_compliance', 0)
        unresolved = inputs.get('unresolved_violations', 0)
        checklist_failures = inputs.get('checklist_failures', 0)
        base = (100 - prev_compliance) * 0.2 + unresolved * 10 + checklist_failures * 5
        score = min(100, max(0, int(base)))
        level = "LOW" if score <= 30 else "MEDIUM" if score <= 60 else "HIGH" if score <= 80 else "CRITICAL"
        factors = []
        if prev_compliance < 50: factors.append("Low previous compliance")
        if unresolved > 0: factors.append(f"{unresolved} unresolved violations")
        return RiskScoreResponse(score=score, level=level, factors=factors or ["No significant risk factors"])
    @staticmethod
    def calculate_compliance_score(inputs):
        checklist_perf = inputs.get('checklist_performance', 0)
        violation_sev = inputs.get('violation_severity', 0)
        prev_perf = inputs.get('previous_performance', 0)
        score = int((checklist_perf * 0.5) + (prev_perf * 0.3) + ((100 - violation_sev) * 0.2))
        score = max(0, min(100, score))
        if score >= 90: grade = "Excellent"; explanation = "High compliance."
        elif score >= 75: grade = "Good"; explanation = "Satisfactory, room for improvement."
        elif score >= 50: grade = "Needs Improvement"; explanation = "Below expected standards."
        else: grade = "Critical"; explanation = "Urgent corrective action required."
        return ComplianceScoreResponse(score=score, grade=grade, explanation=explanation)
