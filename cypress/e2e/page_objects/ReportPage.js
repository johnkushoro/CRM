
export default class ReportPage {

    static REPORT_STATUS_ELEMENT = 'td.listViewTd .badge'
    static REPORT_EXPECTED_AND_ACTUAL_ELEMENT = 'td.listViewTd.text-right'

    verifyReportStatuses() {
        cy.get(ReportPage.REPORT_STATUS_ELEMENT).then($badges => {
            const hasStartingSoonOrComplete = $badges.toArray().some(el =>
                el.textContent.includes('Starting Soon') ||
                el.textContent.includes('Complete') ||
                el.textContent.includes('In Progress')
            );
            expect(hasStartingSoonOrComplete, 'At least one report should be in Starting Soon, Complete, or In Progress status').to.be.true;
        });
    }

    validateCostMetrics() {
        cy.get(ReportPage.REPORT_EXPECTED_AND_ACTUAL_ELEMENT).contains('$').should('exist');
    }
}