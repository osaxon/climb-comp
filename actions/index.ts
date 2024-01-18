"use server";

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
