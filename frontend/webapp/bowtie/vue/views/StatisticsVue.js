let statistics_vue = new Vue({
    //Stocker les données ici
    el : "#statistics-vue",
    components: {
        'statistics-item' : StatsItemComponent
    },
    data: {
        user: {
            isResearcher: false,
            isAuthenticated: true
        },
        statistics: {
            totalTimeSpent : {
                label: 'Total time spent (in minutes)',
                number: 0
            },
            threats: {
                label: 'Threats *',
                number: 0
            },
            causes: {
                label: 'Causes *',
                number: 0
            },
            consequences: {
                label: 'Consequences *',
                number: 0
            },
            barriers: {
                label: 'Barriers *',
                number: 0
            },
            barriersPerConsequences: {
                label: 'Barriers/consequences *',
                number: 0
            },
            count: {
                label: 'Number of diagrams',
                number: 0
            }
        },
        toast: {
            message: '',
            show: false
        },
        errors: {
            UnauthorizedAccessErr: {
                message: 'Sorry, you are not allowed to access this page.',
                show: false
            }
        }
    },
    beforeMount() {
        let token = localStorage.getItem('token');
        if (token !== null) {
            axios.get(window.STATISTICS, {
                headers: {
                    Authorization: 'Token ' + token
                }
            })
                .then(res => {
                    this.user.isResearcher = true;
                    this.fillStatisticsData(res.data);
                })
                .catch(error => {
                    if (error.response) {
                        this.filterGetStatisticsErrors(error.response);
                    }
                })
        }
    },
    methods: {
        showToastMessage: function(message) {
            this.toast.message = message;
            this.toast.show = true;
            window.setTimeout(() => {
                this.toast.show = false;
            }, 3000);
        },
        fillStatisticsData: function(data) {
            if (data.threats__avg !== null) {
                this.statistics.threats = data.threats__avg;
            }
            if (data.consequences__avg !== null) {
                this.statistics.consequences = data.consequences__avg;
            }
            if (data.barriers__avg !== null) {
                this.statistics.barriers = data.barriers__avg;
            }
            if (data.causes__avg !== null) {
                this.statistics.causes = data.causes__avg;
            }
            if (data.totalTimeSpent__avg !== null) {
                this.statistics.totalTimeSpent = data.totalTimeSpent__avg;
            }
            if (data.barriers_per_consequences__avg !== null) {
                this.barriersPerConsequences = data.barriers_per_consequences__avg;
            }
            this.statistics.count = data.count;
        },
        buildCSVData: function() {
            let csvData = "";
            Object.values(this.statistics).forEach(stat => {
                csvData += stat.label + ',';
            })
            csvData = csvData.substring(0, csvData.length-1);
            csvData += '\n';
            Object.values(this.statistics).forEach(stat => {
                csvData += stat.number + ',';
            })
            csvData = csvData.substring(0, csvData.length-1);
            return csvData;
        },
        downloadAsCSV: function() {
            const data = this.buildCSVData();
            const blob = new Blob([data], { type: 'text/csv'});
            const url = window.URL.createObjectURL(blob);
            const  a = document.createElement('a');
            a.setAttribute('hidden', '');
            a.setAttribute('href', url);
            a.setAttribute('download', 'bowtie-statistics.csv');
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },
        filterGetStatisticsErrors: function(error) {
            if (error.status == 401 || error.status == 403) {
                this.errors.UnauthorizedAccessErr.show = true;
            }
        }
    }
})