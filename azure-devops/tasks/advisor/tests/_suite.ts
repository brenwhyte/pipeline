import * as path from 'path';
import * as assert from 'assert';
import * as ttm from 'azure-pipelines-task-lib/mock-test';



describe('Task tests', function () {

    before( function() {
        process.env["SYSTEM_DEFAULTWORKINGDIRECTORY"] =  '/tmp';
        process.env["SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"] = "https://abc.visualstudio.com/";
        process.env["SYSTEM_SERVERTYPE"] = "hosted";
        process.env["ENDPOINT_AUTH_dockerhubendpoint"] = "{\"parameters\":{\"username\":\"test\", \"password\":\"regpassword\", \"email\":\"test@microsoft.com\",\"registry\":\"https://index.docker.io/v1/\"},\"scheme\":\"UsernamePassword\"}";
        process.env["ENDPOINT_AUTH_kubernetesEndpoint"] = "{\"parameters\":{\"kubeconfig\":\"kubeconfig\", \"username\":\"test\", \"password\":\"regpassword\",},\"scheme\":\"UsernamePassword\"}";
        process.env["ENDPOINT_AUTH_PARAMETER_kubernetesEndpoint_KUBECONFIG"] =  "{\"apiVersion\":\"v1\", \"clusters\": [{\"cluster\": {\"insecure-skip-tls-verify\":\"true\", \"server\":\"https://5.6.7.8\", \"name\" : \"scratch\"}}], \"contexts\": [{\"context\" : {\"cluster\": \"scratch\", \"namespace\" : \"default\", \"user\": \"experimenter\", \"name\" : \"exp-scratch\"}], \"current-context\" : \"exp-scratch\", \"kind\": \"Config\", \"users\" : [{\"user\": {\"password\": \"regpassword\", \"username\" : \"test\"}]}";
        //process.env["ENDPOINT_DATA_kubernetesEndpoint_AUTHORIZATIONTYPE"] = process.env[shared.endpointAuthorizationType];
        process.env["ENDPOINT_URL_kubernetesEndpoint"] = "https://mycluster.azure.com";
        process.env["ENDPOINT_AUTH_PARAMETER_kubernetesEndpoint_APITOKEN"] =  "saToken";
        process.env["ENDPOINT_AUTH_PARAMETER_kubernetesEndpoint_SERVICEACCOUNTCERTIFICATE"] =  "saCert";
        
        process.env["ENDPOINT_AUTH_SCHEME_AzureRMSpn"] = "ServicePrincipal";
        process.env["ENDPOINT_AUTH_PARAMETER_AzureRMSpn_SERVICEPRINCIPALID"] = "MOCK_SPN_ID";
        process.env["ENDPOINT_AUTH_PARAMETER_AzureRMSpn_SERVICEPRINCIPALKEY"] = "MOCK_SPN_KEY";
        process.env["ENDPOINT_AUTH_PARAMETER_AzureRMSpn_TENANTID"] = "MOCK_TENANT_ID";
        process.env["ENDPOINT_AUTH_PARAMETER_AzureRMSpn_SCHEME"] = "ServicePrincipal";
        process.env["ENDPOINT_DATA_AzureRMSpn_SUBSCRIPTIONNAME"] = "sName";
        process.env["ENDPOINT_DATA_AzureRMSpn_SUBSCRIPTIONID"] =  "sId";
        process.env["ENDPOINT_DATA_AzureRMSpn_SPNOBJECTID"] =  "oId";
        process.env["ENDPOINT_DATA_AzureRMSpn_ENVIRONMENT"] = "AzureCloud";
        process.env['ENDPOINT_DATA_AzureRMSpn_ENVIRONMENTAUTHORITYURL'] = "https://login.windows.net/";
        process.env['ENDPOINT_URL_AzureRMSpn'] = 'https://management.azure.com/';
        process.env['ENDPOINT_DATA_AzureRMSpn_ACTIVEDIRECTORYSERVICEENDPOINTRESOURCEID'] = 'https://management.azure.com/';
        process.env['AZURE_HTTP_USER_AGENT'] = 'TEST_AGENT';
        //process.env['PATH'] = '/tmp';
        process.env["AGENT_TEMPDIRECTORY"] = "/tmp";
        process.env['AGENT_TOOLSDIRECTORY'] = '/tmp';
        process.env['AGENT_VERSION'] = '2.115.0';
    });

    after(() => {

    });

    it('should succeed to download advisor', function (done) {
        //this.timeout(1000);
    
        let tp = path.join(__dirname, 'advisor-task-wrapper.js');
        let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);

        tr.run();
        console.log(tr.succeeded);
        assert.equal(tr.succeeded, true, 'should have succeeded');
        assert.equal(tr.warningIssues.length, 0, "should have no warnings");
        assert.equal(tr.errorIssues.length, 0, "should have no errors");
        console.log(tr.stdout);
        // assert.equal(tr.stdout.indexOf('Hello human') >= 0, true, "should display Hello human");
        done();
    });


    // it('should succeed with simple inputs', function(done: MochaDone) {
    //     this.timeout(1000);
    
    //     let tp = path.join(__dirname, 'success.js');
    //     let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
    
    //     tr.run();
    //     console.log(tr.succeeded);
    //     assert.equal(tr.succeeded, true, 'should have succeeded');
    //     assert.equal(tr.warningIssues.length, 0, "should have no warnings");
    //     assert.equal(tr.errorIssues.length, 0, "should have no errors");
    //     console.log(tr.stdout);
    //     assert.equal(tr.stdout.indexOf('Hello human') >= 0, true, "should display Hello human");
    //     done();
    // });

    // it('it should fail if tool returns 1', function(done: MochaDone) {
    //     this.timeout(1000);
    
    //     let tp = path.join(__dirname, 'failure.js');
    //     let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
    
    //     tr.run();
    //     console.log(tr.succeeded);
    //     assert.equal(tr.succeeded, false, 'should have failed');
    //     assert.equal(tr.warningIssues, 0, "should have no warnings");
    //     assert.equal(tr.errorIssues.length, 1, "should have 1 error issue");
    //     assert.equal(tr.errorIssues[0], 'Bad input was given', 'error issue output');
    //     assert.equal(tr.stdout.indexOf('Hello bad'), -1, "Should not display Hello bad");
    
    //     done();
    // });    
});