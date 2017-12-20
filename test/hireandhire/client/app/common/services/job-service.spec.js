describe('jobsListService', () => {
    var jobsListService;
    beforeEach(module('ui.router'));
    beforeEach(module('hireandhire'));
    beforeEach(
        inject(_jobsListService_ => {
            jobsListService = _jobsListService_;
        })
    );
    describe('getJobDetails', () => {
        it('should return false if not found', () => {
            jobsListService.allJobsRaw = [{ id: 123 }];
            var _id_ = 12;
            var result = jobsListService.getJobDetails(_id_);
            expect(result).toBeFalsy();
        });

        it('should return job if id is matching', () => {
            job = {
                _id: 123,
                description: 'job',
                skills: 'skill'
            };
            jobsListService.allJobsRaw = [job];

            var id = 123;
            expect(jobsListService.getJobDetails(id)).toEqual({
                description: 'Job description: job',
                skills: 'Skills needed: skill'
            });
        });
    });

    describe('Get all jobs', () => {
        it(
            'should check the result of the query',
            inject($http => {
                spyOn($http, 'get').and.returnValue({
                    then: function() {
                        return { id: 123 };
                    }
                });
                var result = jobsListService.getJobs(123);
                expect(result).toEqual({ id: 123 });
            })
        );
    });
});
