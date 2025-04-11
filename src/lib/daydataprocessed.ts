const bucketChartData=(
    rawData: { date: string; normal: number; saverx: number }[],
    intervalMinutes: number = 30
)=> {
    const buckets = new Map<string, { normalSum: number; saverxSum: number; count: number }>();

    for (const entry of rawData) {
        const [year, month, day, time] = entry.date.split("-");
        const [hour, minute] = time.split(":").map(Number);

        // Round down to nearest interval
        const roundedMinute = Math.floor(minute / intervalMinutes) * intervalMinutes;
        const bucketKey = `${year}-${month}-${day} ${String(hour).padStart(2, "0")}:${String(
            roundedMinute
        ).padStart(2, "0")}`;

        const existing = buckets.get(bucketKey) || { normalSum: 0, saverxSum: 0, count: 0 };
        existing.normalSum += entry.normal;
        existing.saverxSum += entry.saverx;
        existing.count += 1;

        buckets.set(bucketKey, existing);
    }

    const result = Array.from(buckets.entries()).map(([bucketTime, values]) => ({
        date: bucketTime,
        normal: values.normalSum / values.count,
        saverx: values.saverxSum / values.count,
    }));

    return result;
}

export default bucketChartData
