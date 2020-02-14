module.exports = async(app,PORT,loaders) => {
    await loaders(app)
    app.listen(PORT,() =>  console.log(`Server running on PORT ${PORT}..`))
}