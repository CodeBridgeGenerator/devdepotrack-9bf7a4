
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
PEMAJU: faker.lorem.sentence(""),
TAMAN: faker.lorem.sentence(""),
JUMLAH: faker.lorem.sentence(""),
BGREF: faker.lorem.sentence(""),
BANKREF: faker.lorem.sentence(""),
TARIKH: faker.lorem.sentence(""),
R1: faker.lorem.sentence(""),
R2: faker.lorem.sentence(""),
CALL: faker.lorem.sentence(""),
CATATAN: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
