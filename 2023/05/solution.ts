import Bun from "bun";

const input = await Bun.file(
	`${import.meta.dir}/input${process.env.NODE_ENV === "dev" ? "-test" : ""}.txt`,
).text();

partOne();
partTwo();

function partOne() {
	const initialSeedRegex = /^seeds:\s((?:\d+[^\S])+)$/gim;
	const xToYMapsRegex = /(?:^\n(?<source>\D+)-to-(?<destination>\D+)\smap:$)+/gim;
	const rangesRegex = /^(?<destinationRangeStart>\d+)\s(?<sourceRangeStart>\d+)\s(?<range>\d+)$/gim;

	console.time("partOne");

	const seedsMatch = initialSeedRegex.exec(input);
	const xToYMapsMatch = input.matchAll(xToYMapsRegex);
	const xToYMapsArray = [...xToYMapsMatch];

	if (!seedsMatch) throw new Error("oops");

	const seeds = seedsMatch[1].replace("\n", "").split(" ");

	const seedToLocationMap = Object.fromEntries(seeds.map((seed) => [seed, Number(seed)]));

	for (const [index, match] of xToYMapsArray.entries()) {
		if (!match.groups) throw new Error("oops");

		const next = xToYMapsArray.at(index + 1);

		const currentRangesSubstring = input.slice(
			input.indexOf(match[0]),
			next ? input.indexOf(next[0]) : input.length,
		);

		const rangesMatches = currentRangesSubstring.matchAll(rangesRegex);

		const rangesGroups = [...rangesMatches]
			.map((rangesMatch) => rangesMatch.groups)
			.filter(Boolean);

		for (const seed in seedToLocationMap) {
			let minRangeToMap: (typeof rangesGroups)[number] | null = null;

			const currentValue = seedToLocationMap[seed];

			for (const ranges of rangesGroups) {
				const { sourceRangeStart, range } = ranges;

				if (currentValue < Number(sourceRangeStart)) continue;
				else if (currentValue >= Number(sourceRangeStart) + Number(range)) continue;
				else if (
					minRangeToMap &&
					Number(minRangeToMap["sourceRangeStart"]) < Number(sourceRangeStart)
				) {
					continue;
				}

				minRangeToMap = ranges;
			}

			seedToLocationMap[seed] = minRangeToMap
				? currentValue -
				  (Number(minRangeToMap["sourceRangeStart"]) -
						Number(minRangeToMap["destinationRangeStart"]))
				: currentValue;
		}
	}

	console.log(Math.min(...Object.values(seedToLocationMap)));

	console.timeEnd("partOne");
}

function partTwo() {
	console.time("partTwo");

	const initialSeedRegex = /^seeds:\s((?:\d+[^\S])+)$/gim;
	const xToYMapsRegex = /(?:^\n(?<source>\D+)-to-(?<destination>\D+)\smap:$)+/gim;
	const rangesRegex = /^(?<destinationRangeStart>\d+)\s(?<sourceRangeStart>\d+)\s(?<range>\d+)$/gim;

	console.time("partOne");

	const seedsMatch = initialSeedRegex.exec(input);
	const xToYMapsMatch = input.matchAll(xToYMapsRegex);
	const xToYMapsArray = [...xToYMapsMatch];

	if (!seedsMatch) throw new Error("oops");

	const seeds = seedsMatch[1].replace("\n", "").split(" ");

	const seedToLocationMap: Record<string, number> = {};

	for (const [index, seed] of seeds.entries()) {
		if ((index + 1) % 2 === 0) continue;

		const range = seeds[index + 1];

		for (let i = 0; i < Number(range); i++) {
			seedToLocationMap[String(Number(seed) + i)] = Number(seed) + i;
		}
	}

	for (const [index, match] of xToYMapsArray.entries()) {
		if (!match.groups) throw new Error("oops");

		const next = xToYMapsArray.at(index + 1);

		const currentRangesSubstring = input.slice(
			input.indexOf(match[0]),
			next ? input.indexOf(next[0]) : input.length,
		);

		const rangesMatches = currentRangesSubstring.matchAll(rangesRegex);

		const rangesGroups = [...rangesMatches]
			.map((rangesMatch) => rangesMatch.groups)
			.filter(Boolean);

		for (const [seed, currentValue] of Object.entries(seedToLocationMap)) {
			let minRangeToMap: (typeof rangesGroups)[number] | null = null;

			for (const ranges of rangesGroups) {
				const { sourceRangeStart, range } = ranges;

				if (currentValue < Number(sourceRangeStart)) continue;
				else if (currentValue >= Number(sourceRangeStart) + Number(range)) continue;
				else if (
					minRangeToMap &&
					Number(minRangeToMap["sourceRangeStart"]) < Number(sourceRangeStart)
				) {
					continue;
				}

				minRangeToMap = ranges;
			}

			seedToLocationMap[seed] = minRangeToMap
				? currentValue -
				  (Number(minRangeToMap["sourceRangeStart"]) -
						Number(minRangeToMap["destinationRangeStart"]))
				: currentValue;
		}
	}

	console.log(Math.min(...Object.values(seedToLocationMap)));

	console.timeEnd("partTwo");
}
