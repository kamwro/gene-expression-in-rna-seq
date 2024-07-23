from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

from src.models import GeneratePdfRequest


async def build_pdf(generate_pdf_data: GeneratePdfRequest):
    buffer = BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter
    margin = 40  # Margins from the edges
    line_height = 15  # Height of each line
    title_height = 30  # Space for title
    section_title_height = 20  # Space for section titles
    y_position = height - margin  # Starting Y position from the top

    def draw_text(text, x, y):
        nonlocal y_position
        if y_position < margin:
            c.showPage()
            c.setFont("Helvetica", 12)
            y_position = height - margin
        c.drawString(x, y_position, text)
        y_position -= line_height

    # Title
    c.setFont("Helvetica-Bold", 20)
    c.setFillColorRGB(0, 0, 1)  # Blue
    draw_text("Results", margin, y_position)
    y_position -= title_height  # Adding space below the title

    # Extract data from the request
    expression_level = generate_pdf_data.data.expression_level
    gene_counts = generate_pdf_data.data.gene_counts

    # Expression Level
    c.setFont("Helvetica-Bold", 15)
    draw_text("Expression Level", margin, y_position)
    y_position -= section_title_height  # Adding space before the section content

    c.setFont("Helvetica", 12)
    c.setFillColorRGB(0, 0, 0)  # Back to black
    for key, value in expression_level.items():
        c.drawString(
            40,
            y_position,
            f"{key}: {value:.2f}" if isinstance(value, float) else f"{key}: {value}",
        )
        y_position -= 15

    # Gene Counts
    y_position -= section_title_height  # Adding space before the section content
    c.setFont("Helvetica-Bold", 15)
    c.setFillColorRGB(0, 0, 1)  # Blue
    draw_text("Gene Counts", margin, y_position)
    y_position -= section_title_height  # Adding space before the section content

    c.setFont("Helvetica", 12)
    c.setFillColorRGB(0, 0, 0)  # Back to black
    for key, value in gene_counts.items():
        draw_text(f"{key}: {value}", margin, y_position)

    c.save()
    buffer.seek(0)

    return buffer
