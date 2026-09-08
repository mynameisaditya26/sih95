from pydantic import BaseModel
from typing import List, Optional, Dict, Any
class AnalysisResult(BaseModel):
    findings: List[str]
    detectedIssues: List[str]
    confidence: float
    recommendations: List[str]
class RiskScoreRequest(BaseModel):
    previous_compliance: Optional[float] = 0
    previous_violations: int = 0
    unresolved_violations: int = 0
    checklist_failures: int = 0
    ai_findings: List[str] = []
    inspection_history: int = 0
class RiskScoreResponse(BaseModel):
    score: int
    level: str
    factors: List[str]
class ComplianceScoreRequest(BaseModel):
    checklist_performance: float
    violation_severity: float
    previous_performance: float
class ComplianceScoreResponse(BaseModel):
    score: int
    grade: str
    explanation: str
class ReportRequest(BaseModel):
    institution_name: str
    inspector_name: str
    checklist: List[Dict[str, Any]]
    evidence_summary: List[str]
    ai_findings: List[str]
    violations: List[Dict[str, Any]]
    risk_score: int
    compliance_score: int
    recommendations: Optional[List[str]] = None
class ReportResponse(BaseModel):
    summary: str
    findings: List[str]
    violations: List[Dict[str, Any]]
    evidence_summary: List[str]
    risk_assessment: Dict[str, Any]
    recommendations: List[str]
    corrective_actions: List[str]
