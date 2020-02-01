export class FillUp {
    vehicleId: number;
    vehicleName: string;
    liquidUnitId: number;
    liquidUnitName: string;
    amount: number;
    odometer: number; 
    price: number;
    date: string;
    notes?: string;
    isDeleted?: number = 0;
}