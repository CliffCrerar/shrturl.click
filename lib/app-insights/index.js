let appInsights = require('applicationinsights');

appInsights.setup(process.env['APPLICATIONINSIGHTS_CONNECTION_STRING'])
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .setUseDiskRetryCaching(true)
    .setSendLiveMetrics(false)
    .setDistributedTracingMode(appInsights.DistributedTracingModes.AI)
    .enableWebInstrumentation(true)
    .start();

module.exports = appInsights.defaultClient;