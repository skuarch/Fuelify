export interface FillUp {
    vehicleId: number;
    liquidUnitId: number;
    amount: number;
    odometer: number; 
    price: number;
    date: string;
    notes?: string;
    isDeleted: number;
}