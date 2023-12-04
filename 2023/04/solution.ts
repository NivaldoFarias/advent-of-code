import Bun from "bun";

const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

partOne();
partTwo();

function partOne() {
	console.time("partOne");

	let sum = 0;
	const lines = input.split("\n");

	for (const line of lines) {
		const [winningCardsSubstring, playerCardsSubstring] = line.slice(line.indexOf(":")).split("|");

		const winningCards = winningCardsSubstring?.match(/\d+/g);
		const playerCards = playerCardsSubstring?.match(/\d+/g);

		if (!winningCards || !playerCards) throw new Error("oops");

		const winners = playerCards.filter((card) => winningCards.includes(card));

		if (winners.length) sum += Math.pow(2, winners.length - 1);
	}

	console.log(sum);

	console.timeEnd("partOne");
}

function partTwo() {
	console.time("partTwo");

	const lines = input.split("\n");
	const copies = lines.map(() => 1);

	for (const [cardIndex, line] of lines.entries()) {
		const [winningCardsSubstring, playerCardsSubstring] = line.slice(line.indexOf(":")).split("|");

		const winningCards = winningCardsSubstring?.match(/\d+/g);
		const playerCards = playerCardsSubstring?.match(/\d+/g);
		const currentCopies = copies[cardIndex];

		if (!winningCards || !playerCards || !currentCopies) throw new Error("oops");

		const winners = playerCards.filter((card) => winningCards.includes(card));

		if (winners.length > 0) {
			for (const [winnerIndex] of winners.entries()) {
				copies[cardIndex + winnerIndex + 1] += currentCopies * 1;
			}
		}
	}

	console.log(copies.reduce((sum, nOfCopies) => sum + nOfCopies, 0));

	console.timeEnd("partTwo");
}
