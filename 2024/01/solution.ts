import Bun from "bun";

const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

void solve(input);

function solve(input: string) {
	partOne(input);
	partTwo(input);
}

function partOne(input: string) {
	console.time("part-one");

	// * each line has two numbers, ex.: 61087   87490
	const lines = input.split("\n");

	// * convert each line to an array of numbers
	const numbers = lines.map((line) => line.split("   ").map(Number));

	// * sort the numbers from left and right
	const sorted = {
		left: numbers.map((line) => line[0]).toSorted((a, b) => a - b),
		right: numbers.map((line) => line[1]).toSorted((a, b) => a - b),
	};

	// * from each pair, calculate the distance between them
	// * ex.: 61087 - 87490 = 26403
	const distances = sorted.left.map((left, i) => Math.abs(sorted.right[i] - left));

	// * sum all distances
	const sumOfDistances = distances.reduce((acc, distance) => acc + distance, 0);

	console.log(sumOfDistances);

	console.timeEnd("part-one");
}

function partTwo(input: string) {
	console.time("part-two");

	// * each line has two numbers, ex.: 61087   87490
	const lines = input.split("\n");

	// * convert each line to an array of numbers
	const lists = lines.map((line) => line.split("   ").map(Number));
	const left = lists.map((list) => list[0]);
	const right = lists.map((list) => list[1]);

	// * from each line, take the left number and count
	// * how many times it appears in the right list
	const similarities = left.map((left) =>
		right.reduce((acc, right) => acc + (left === right ? 1 : 0), 0),
	);

	// * calculate each line by multiplying the left number
	// * by the number of times it appears in the right list
	const products = left.map((left, i) => left * similarities[i]);

	// * sum all products
	const sumOfProducts = products.reduce((acc, product) => acc + product, 0);

	console.log(sumOfProducts);

	console.timeEnd("part-two");
}
