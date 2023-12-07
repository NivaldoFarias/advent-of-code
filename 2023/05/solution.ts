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

	const mappedLocations = seedsMatch[1]
		.replace("\n", "")
		.split(" ")
		.map((seed) => {
			let mappedValue = Number(seed);

			for (const [index, match] of xToYMapsArray.entries()) {
				const next = xToYMapsArray.at(index + 1);

				const currentRangesSubstring = input.slice(
					input.indexOf(match[0]),
					next ? input.indexOf(next[0]) : input.length,
				);

				const rangesMatches = currentRangesSubstring.matchAll(rangesRegex);

				const rangesGroups = [...rangesMatches]
					.map((rangesMatch) => rangesMatch.groups)
					.filter(Boolean);

				let minRangeToMap: (typeof rangesGroups)[number] | null = null;

				for (const ranges of rangesGroups) {
					const { sourceRangeStart, range } = ranges;

					if (mappedValue < Number(sourceRangeStart)) continue;
					else if (mappedValue >= Number(sourceRangeStart) + Number(range)) continue;
					else if (
						minRangeToMap &&
						Number(minRangeToMap["sourceRangeStart"]) < Number(sourceRangeStart)
					) {
						continue;
					}

					minRangeToMap = ranges;
				}

				mappedValue = minRangeToMap
					? mappedValue -
					  (Number(minRangeToMap["sourceRangeStart"]) -
							Number(minRangeToMap["destinationRangeStart"]))
					: mappedValue;
			}

			return mappedValue;
		});

	console.log(Math.min(...mappedLocations));

	console.timeEnd("partOne");
}

function partTwo() {
	console.time("partTwo");

	const seedsRangeRegex = /\d+\s\d+/gi;
	const xToYMapsRegex = /(?:^\n(?<source>\D+)-to-(?<destination>\D+)\smap:$)+/gim;
	const rangesRegex = /^(?<destinationRangeStart>\d+)\s(?<sourceRangeStart>\d+)\s(?<range>\d+)$/gim;

	console.time("partOne");

	const seedsRangeMatch = input.split("\n")[0].matchAll(seedsRangeRegex);
	const xToYMapsMatch = input.matchAll(xToYMapsRegex);
	const xToYMapsArray = [...xToYMapsMatch];

	const seeds = [...seedsRangeMatch].map((seedRange) => {
		const [seed, range] = seedRange[0].split(" ");

		return [Number(seed), Number(seed) + Number(range) - 1] as const;
	});

	let minLocation: number | null = null;

	const categoriesRanges = xToYMapsArray.map((match, index) => {
		const next = xToYMapsArray.at(index + 1);

		const currentRangesSubstring = input.slice(
			input.indexOf(match[0]),
			next ? input.indexOf(next[0]) : input.length,
		);

		const rangesMatches = currentRangesSubstring.matchAll(rangesRegex);

		const rangesGroups = [...rangesMatches]
			.map((rangesMatch) => rangesMatch.groups)
			.filter(Boolean);

		return rangesGroups;
	});

	for (const [seed, range] of seeds) {
		for (let min = seed; min < range; min++) {
			let mappedValue = Number(min);

			for (const categoryRanges of categoriesRanges) {
				let minRangeToMap: (typeof categoryRanges)[number] | null = null;

				for (const ranges of categoryRanges) {
					const { sourceRangeStart, range } = ranges;

					if (mappedValue < Number(sourceRangeStart)) continue;
					else if (mappedValue >= Number(sourceRangeStart) + Number(range)) continue;
					else if (
						minRangeToMap &&
						Number(minRangeToMap["sourceRangeStart"]) < Number(sourceRangeStart)
					) {
						continue;
					}

					minRangeToMap = ranges;
				}

				mappedValue = minRangeToMap
					? mappedValue -
					  (Number(minRangeToMap["sourceRangeStart"]) -
							Number(minRangeToMap["destinationRangeStart"]))
					: mappedValue;
			}

			if (minLocation && mappedValue >= minLocation) continue;

			minLocation = mappedValue;
			console.log(minLocation, mappedValue);
		}
	}

	console.log(minLocation);

	console.timeEnd("partTwo");
}
