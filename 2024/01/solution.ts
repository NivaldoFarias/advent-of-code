import Bun from "bun";

const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

partOne(input);
partTwo(input);

function partOne(input: string) {
	console.time("part-one");

	console.timeEnd("part-one");
}

function partTwo(input: string) {
	console.time("part-two");

	console.timeEnd("part-two");
}
