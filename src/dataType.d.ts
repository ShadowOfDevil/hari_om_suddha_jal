export interface Bill {
    id: string,
    bill_no: string,
    name: string,
    date: string,
    bill_data: BillData[],
    total: number,
    created_at: string,
    updated_at: string,
}

export interface BillData {
    id:number;
    particular: string,
    qty: string,
    rate: string,
    ammount: number
}

