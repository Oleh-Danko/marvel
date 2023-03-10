function test(n, m) {
    for (let i = n; i > m; i--) {
        if (i % 2 === 0) console.log(i)
    }
}

test(80, 60)