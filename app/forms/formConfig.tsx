// formConfig.js
export const forms = {
    form_painting_qc: [
        { name: 'date', label: 'Date', type: 'date' },
        { name: 'quantity', label: 'Quantity', type: 'number' },
        { name: 'ref_drg_no', label: 'Reference Drawing Number', type: 'text' },
        { name: 'location', label: 'Location', type: 'text' },
        { name: 'checklist_id', label: 'Checklist ID', type: 'number', defaultValue: 2, readOnly: true },
        { name: 'description', label: 'Description', type: 'text' },
        { name: 'cleaning_surface', label: 'Cleaning Surface', type: 'text' },
        { name: 'specs_available', label: 'Specs Available', type: 'text' },
        { name: 'filling_pits', label: 'Filling Pits', type: 'text' },
        { name: 'safety_scaffolding', label: 'Safety Scaffolding', type: 'text' },
        { name: 'scaffolding_clearance', label: 'Scaffolding Clearance', type: 'text' },
        { name: 'chemical_paint', label: 'Chemical Paint', type: 'text' },
        { name: 'painting_gangs', label: 'Painting Gangs', type: 'text' },
        { name: 'bonding_agent', label: 'Bonding Agent', type: 'text' },
        { name: 'consistency_paint', label: 'Consistency of Paint', type: 'text' },
        { name: 'application_uniform', label: 'Application Uniformity', type: 'text' },
        { name: 'number_coats', label: 'Number of Coats', type: 'number' },
        { name: 'time_between_coats', label: 'Time Between Coats', type: 'text' },
        { name: 'removal_scaffolds_cleaning', label: 'Removal of Scaffolds/Cleaning', type: 'text' },
        { name: 'contractor', label: 'Contractor', type: 'text' },
        { name: 'tsl_site_engg', label: 'TSL Site Engineer', type: 'text' },
        { name: 'tsl_qa', label: 'TSL QA', type: 'text' },
    ],
    // Add more forms if needed
};
