<script>
    const list = [1, 2, 3, 4, 5];

    const shuffleList = (list) => {
        const listToShuffle = [...list];
    
        for (let i = listToShuffle.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [listToShuffle[i], listToShuffle[j]] = [listToShuffle[j], listToShuffle[i]];
        }
    
        return listToShuffle;
    };

    const randomItem = shuffleList(list);
</script>

<h1>Welcome to Decision Making with Software's Help</h1>

<p>{randomItem[0]}</p>