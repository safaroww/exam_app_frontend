function getId() {
    return Math.random().toString().slice(2,) + new Date().getTime()
}

export default getId;