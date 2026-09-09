from fastapi import APIRouter, UploadFile, File, Body
from app.services.analysis_service import AnalysisService
from app.services.risk_service import RiskService
from app.services.report_service import ReportService
from app.models.schemas import AnalysisResult, RiskScoreRequest, RiskScoreResponse, ComplianceScoreRequest, ComplianceScoreResponse, ReportRequest, ReportResponse

router = APIRouter(prefix="/ai", tags=["AI"])

@router.post("/analyze-image", response_model=AnalysisResult)
async def analyze_image(file: UploadFile = File(...)):
    contents = await file.read()
    result = await AnalysisService.analyze_image(contents, file.filename)
    return AnalysisResult(**result)

@router.post("/analyze-video")
async def analyze_video(file: UploadFile = File(...)):
    """Accept a video file and return mock anomaly analysis (SIH demo)."""
    contents = await file.read()
    result = await AnalysisService.analyze_video(contents, file.filename or "video.mp4")
    return result

@router.post("/risk-score", response_model=RiskScoreResponse)
async def calculate_risk_score(request: RiskScoreRequest = Body(...)):
    return RiskService.calculate_risk_score(request.dict())

@router.post("/compliance-score", response_model=ComplianceScoreResponse)
async def calculate_compliance_score(request: ComplianceScoreRequest = Body(...)):
    return RiskService.calculate_compliance_score(request.dict())

@router.post("/generate-report", response_model=ReportResponse)
async def generate_report(request: ReportRequest = Body(...)):
    result = ReportService.generate_report_from_template(request.dict())
    return ReportResponse(**result)