import fsPromises from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server'

const dataFilePath = path.join(process.cwd(), 'db.json');

export async function GET() {
    const jsonData = await fsPromises.readFile(dataFilePath);
    const objectData = JSON.parse(jsonData);
    return NextResponse.json(objectData.transactions.reverse())
}