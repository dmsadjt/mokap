export interface Certificate {
	name: string;
	issuer: string;
	issuedDate: string;
	expiryDate: string;
	credentialId: string;
	description: string;
	image: string;
}

// Placeholder sample data.
export const certificates: Certificate[] = [
	{ name: 'ISO 9001:2015 Quality Management', issuer: 'Sample Certification Body', issuedDate: '2024-01-15', expiryDate: '2027-01-14', credentialId: 'QMS-000123', description: 'Certifies our quality management system.', image: '' },
	{ name: 'ISO 14001:2015 Environmental Management', issuer: 'Sample Certification Body', issuedDate: '2024-01-15', expiryDate: '2027-01-14', credentialId: 'EMS-000456', description: 'Certifies our environmental management system.', image: '' },
	{ name: 'Authorized Dealer Certificate', issuer: 'Example Manufacturer', issuedDate: '2025-02-01', expiryDate: '', credentialId: '', description: 'Official authorization to sell and service the manufacturer products.', image: '' },
];
