"use server";
import { db } from "@/db";

const wait = () =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 750);
    });

export const login = async (values: any) => {
    await wait();
    console.log(values);
};

export const getLocations = async () => {
    try {
        return await db.query.locations.findMany();
    } catch (error) {
        if (error instanceof AggregateError) {
            throw new Error(error.errors[0].message);
        }
        throw new Error("something went wrong");
    }
};
