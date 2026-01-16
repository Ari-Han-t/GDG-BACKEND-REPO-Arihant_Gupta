require("./jobs/reminder.job");
const logger = require("./utils/logger");
const app=require("./app");
const PORT= 5000;
app.listen(PORT,()=>{
    logger.info(`Server running on port ${PORT}`);
});