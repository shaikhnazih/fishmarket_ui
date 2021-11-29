import mock from './../mock';

const projectDashboardAppDB = {
    widgets : {
        'approvalWidget': {
            'title': 'Approvals',
            'data'        : {
                'label': 'Pending',
                'count': 0,
                'extra': {
                    'label': 'Completed',
                    'count': 0
                }
            },
            'detail'      : 'detail.'
        },
        'retailerEnrollmentWidget'      : {
            'title' : 'Retailer Enrolled',
            'data'  : {
                'label': 'Current Month',
                'count': 0,
                'extra': {
                    'label': 'Overall',
                    'count': 0
                }
            },
            'detail': 'detail'
        },
        'distributorEnrollmentWidget'      : {
            'title' : 'Distributor Enrolled',
            'data'  : {
                'label': 'Current Month',
                'count': 0,
                'extra': {
                    'label': 'Overall',
                    'count': 0
                }
            },
            'detail': 'detail'
        },
        'schemeCounterWidget'      : {
            'title' : 'Schemes',
            'data'  : {
                'label': 'Active',
                'count': 0,
                'extra': {
                    'label': 'Completed',
                    'count': 0
                }
            },
            'detail': '.'
        },
        'summaryDashboardWidget'      : {
            'title' : 'Summary',
            'data'  : {
                'label': 'Active',
                'count': 0,
                'extra': {
                    'label': 'Completed',
                    'count': 0
                }
            },
            'detail': '.'
        },
        'widget5'      : {
            'title'     : 'Retailer Enrollment',
            'ranges'    : {
                'TW': ''
            },
            'mainChart' : {
                'TW'     : {
                    labels  : ['March', 'April', 'May', 'June'],
                    datasets: [
                        {
                            type                : 'bar',
                            label               : 'Not Enrolled',
                            data                : [324, 324, 296, 288],
                            backgroundColor     : '#42BFF7',
                            hoverBackgroundColor: '#87CDF7',
                            categoryPercentage  : 1
                        },
                        {
                            type                : 'bar',
                            label               : 'Enrolled',
                            data                : [0, 0, 28, 8],
                            backgroundColor     : '#C6ECFD',
                            hoverBackgroundColor: '#D7EFFD',
                            categoryPercentage  : 1
                        }
                    ]
                },
                '2W'     : {
                    labels  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                        {
                            type                : 'bar',
                            label               : 'Issues',
                            data                : [37, 32, 39, 27, 18, 24, 20],
                            backgroundColor     : '#42BFF7',
                            hoverBackgroundColor: '#87CDF7',
                            categoryPercentage  : 1
                        },
                        {
                            type                : 'bar',
                            label               : 'Closed issues',
                            data                : [9, 12, 9, 12, 7, 8, 16],
                            backgroundColor     : '#C6ECFD',
                            hoverBackgroundColor: '#D7EFFD',
                            categoryPercentage  : 1
                        }
                    ]
                },
                'LW'     : {
                    labels  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                        {
                            type                : 'bar',
                            label               : 'Issues',
                            data                : [37, 24, 51, 31, 29, 17, 31],
                            backgroundColor     : '#42BFF7',
                            hoverBackgroundColor: '#87CDF7',
                            categoryPercentage  : 1
                        },
                        {
                            type                : 'bar',
                            label               : 'Closed issues',
                            data                : [12, 8, 7, 13, 7, 6, 10],
                            backgroundColor     : '#C6ECFD',
                            hoverBackgroundColor: '#D7EFFD',
                            categoryPercentage  : 1
                        }
                    ]
                },
                'options': {
                    responsive         : true,
                    maintainAspectRatio: false,
                    legend             : {
                        display: false
                    },
                    tooltips           : {
                        mode: 'label'
                    },
                    scales             : {
                        xAxes: [
                            {
                                stacked  : true,
                                display  : true,
                                gridLines: {
                                    display: false
                                },
                                labels   : ['April', 'May', 'June']
                            }
                        ],
                        yAxes: [
                            {
                                stacked  : true,
                                type     : 'linear',
                                display  : true,
                                position : 'left',
                                gridLines: {
                                    display: false
                                },
                                labels   : {
                                    show: true
                                }
                            }
                        ]
                    }
                }
            },
            'supporting': {
                'created'  : {
                    'label': 'North',
                    'count': {
                        '2W': 48,
                        'LW': 46,
                        'TW': 54
                    },
                    'chart': {
                        'TW'   : {
                            datasets: [
                                {
                                    label          : 'Created',
                                    data           : [3, 2, 1, 4, 8, 8, 4],
                                    fill           : true,
                                    backgroundColor: '#42BFF7',
                                    pointRadius    : 0,
                                    pointHitRadius : 20,
                                    borderWidth    : 0
                                }
                            ],
                            labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        options: {
                            legend             : {
                                display: false
                            },
                            maintainAspectRatio: false,
                            scales             : {
                                xAxes: [
                                    {
                                        display: false
                                    }
                                ],
                                yAxes: [
                                    {
                                        display: false
                                    }
                                ]
                            }
                        }
                    }
                },
                'closed'   : {
                    'label': 'South',
                    'count': {
                        '2W': 27,
                        'LW': 31,
                        'TW': 26
                    },
                    'chart': {
                        'TW'   : {
                            datasets: [
                                {
                                    label          : 'Created',
                                    data           : [6, 3, 7, 5, 5, 4, 7],
                                    fill           : true,
                                    backgroundColor: '#42BFF7',
                                    pointRadius    : 0,
                                    pointHitRadius : 20,
                                    borderWidth    : 0
                                }
                            ],
                            labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        '2W'   : {
                            datasets: [
                                {
                                    label          : 'Created',
                                    data           : [3, 2, 1, 4, 8, 8, 4],
                                    fill           : true,
                                    backgroundColor: '#42BFF7',
                                    pointRadius    : 0,
                                    pointHitRadius : 20,
                                    borderWidth    : 0
                                }
                            ],
                            labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        'LW'   : {
                            datasets: [
                                {
                                    label          : 'Created',
                                    data           : [6, 5, 4, 5, 7, 4, 7],
                                    fill           : true,
                                    backgroundColor: '#42BFF7',
                                    pointRadius    : 0,
                                    pointHitRadius : 20,
                                    borderWidth    : 0
                                }
                            ],
                            labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        options: {
                            legend             : {
                                display: false
                            },
                            maintainAspectRatio: false,
                            scales             : {
                                xAxes: [
                                    {
                                        display: false
                                    }
                                ],
                                yAxes: [
                                    {
                                        display: false
                                    }
                                ]
                            }
                        }
                    }
                },
                'reOpened' : {
                    'label': 'East',
                    'count': {
                        '2W': 4,
                        'LW': 5,
                        'TW': 2
                    },
                    'chart': {
                        '2W'   : {
                            datasets: [
                                {
                                    label          : 'Created',
                                    data           : [6, 3, 7, 5, 5, 4, 7],
                                    fill           : true,
                                    backgroundColor: '#42BFF7',
                                    pointRadius    : 0,
                                    pointHitRadius : 20,
                                    borderWidth    : 0
                                }
                            ],
                            labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        'LW'   : {
                            datasets: [
                                {
                                    label          : 'Created',
                                    data           : [5, 7, 8, 8, 6, 4, 1],
                                    fill           : true,
                                    backgroundColor: '#42BFF7',
                                    pointRadius    : 0,
                                    pointHitRadius : 20,
                                    borderWidth    : 0
                                }
                            ],
                            labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        'TW'   : {
                            datasets: [
                                {
                                    label          : 'Created',
                                    data           : [3, 2, 1, 4, 8, 8, 4],
                                    fill           : true,
                                    backgroundColor: '#42BFF7',
                                    pointRadius    : 0,
                                    pointHitRadius : 20,
                                    borderWidth    : 0
                                }
                            ],
                            labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        'TW2'  : [
                            {
                                'name'  : 'RE-OPENED',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 3
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 2
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 1
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 4
                                    }
                                ]
                            }
                        ],
                        options: {
                            legend             : {
                                display: false
                            },
                            maintainAspectRatio: false,
                            scales             : {
                                xAxes: [
                                    {
                                        display: false
                                    }
                                ],
                                yAxes: [
                                    {
                                        display: false
                                    }
                                ]
                            }
                        }
                    }
                },
                'wontFix'  : {
                    'label': 'West',
                    'count': {
                        '2W': 6,
                        'LW': 3,
                        'TW': 4
                    },
                    'chart': {
                        '2W'   : {
                            datasets: [
                                {
                                    label          : 'Created',
                                    data           : [5, 7, 4, 6, 5, 3, 2],
                                    fill           : true,
                                    backgroundColor: '#42BFF7',
                                    pointRadius    : 0,
                                    pointHitRadius : 20,
                                    borderWidth    : 0
                                }
                            ],
                            labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        'LW'   : {
                            datasets: [
                                {
                                    label          : 'Created',
                                    data           : [6, 3, 7, 5, 5, 4, 7],
                                    fill           : true,
                                    backgroundColor: '#42BFF7',
                                    pointRadius    : 0,
                                    pointHitRadius : 20,
                                    borderWidth    : 0
                                }
                            ],
                            labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        'TW'   : {
                            datasets: [
                                {
                                    label          : 'Created',
                                    data           : [6, 5, 4, 5, 7, 4, 7],
                                    fill           : true,
                                    backgroundColor: '#42BFF7',
                                    pointRadius    : 0,
                                    pointHitRadius : 20,
                                    borderWidth    : 0
                                }
                            ],
                            labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        options: {
                            legend             : {
                                display: false
                            },
                            maintainAspectRatio: false,
                            scales             : {
                                xAxes: [
                                    {
                                        display: false
                                    }
                                ],
                                yAxes: [
                                    {
                                        display: false
                                    }
                                ]
                            }
                        }
                    }
                },
                'needsTest': {
                    'label': 'Central',
                    'count': {
                        '2W': 10,
                        'LW': 7,
                        'TW': 8
                    },
                    'chart': {
                        '2W'   : {
                            datasets: [
                                {
                                    label          : 'Created',
                                    data           : [6, 5, 4, 5, 7, 4, 7],
                                    fill           : true,
                                    backgroundColor: '#42BFF7',
                                    pointRadius    : 0,
                                    pointHitRadius : 20,
                                    borderWidth    : 0
                                }
                            ],
                            labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        'LW'   : {
                            datasets: [
                                {
                                    label          : 'Created',
                                    data           : [5, 7, 8, 8, 6, 4, 1],
                                    fill           : true,
                                    backgroundColor: '#42BFF7',
                                    pointRadius    : 0,
                                    pointHitRadius : 20,
                                    borderWidth    : 0
                                }
                            ],
                            labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        'TW'   : {
                            datasets: [
                                {
                                    label          : 'Created',
                                    data           : [6, 3, 7, 5, 5, 4, 7],
                                    fill           : true,
                                    backgroundColor: '#42BFF7',
                                    pointRadius    : 0,
                                    pointHitRadius : 20,
                                    borderWidth    : 0
                                }
                            ],
                            labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        options: {
                            legend             : {
                                display: false
                            },
                            maintainAspectRatio: false,
                            scales             : {
                                xAxes: [
                                    {
                                        display: false
                                    }
                                ],
                                yAxes: [
                                    {
                                        display: false
                                    }
                                ]
                            }
                        }
                    }
                },
                'fixed'    : {
                    'label': 'North East',
                    'count': {
                        '2W': 21,
                        'LW': 17,
                        'TW': 14
                    },
                    'chart': {
                        '2W'   : {
                            datasets: [
                                {
                                    label          : 'Created',
                                    data           : [5, 7, 8, 8, 6, 4, 1],
                                    fill           : true,
                                    backgroundColor: '#42BFF7',
                                    pointRadius    : 0,
                                    pointHitRadius : 20,
                                    borderWidth    : 0
                                }
                            ],
                            labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        'LW'   : {
                            datasets: [
                                {
                                    label          : 'Created',
                                    data           : [6, 5, 4, 5, 7, 4, 7],
                                    fill           : true,
                                    backgroundColor: '#42BFF7',
                                    pointRadius    : 0,
                                    pointHitRadius : 20,
                                    borderWidth    : 0
                                }
                            ],
                            labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        'TW'   : {
                            datasets: [
                                {
                                    label          : 'Created',
                                    data           : [5, 7, 4, 6, 5, 3, 2],
                                    fill           : true,
                                    backgroundColor: '#42BFF7',
                                    pointRadius    : 0,
                                    pointHitRadius : 20,
                                    borderWidth    : 0
                                }
                            ],
                            labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        options: {
                            legend             : {
                                display: false
                            },
                            maintainAspectRatio: false,
                            scales             : {
                                xAxes: [
                                    {
                                        display: false
                                    }
                                ],
                                yAxes: [
                                    {
                                        display: false
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        },
        'widget6'      : {
            'title'       : 'Task Distribution',
            'ranges'      : {
                'TW': 'This Week',
                'LW': 'Last Week',
                '2W': '2 Weeks Ago'
            },
            'currentRange': 'TW',
            'mainChart'   : {
                labels  : [
                    'Frontend',
                    'Backend',
                    'API',
                    'Issues'
                ],
                datasets: {
                    'TW': [
                        {
                            data                : [15, 20, 38, 27],
                            backgroundColor     : [
                                '#F44336',
                                '#9C27B0',
                                '#03A9F4',
                                '#E91E63'
                            ],
                            hoverBackgroundColor: [
                                '#F45A4D',
                                '#A041B0',
                                '#25B6F4',
                                '#E9487F'
                            ]
                        }
                    ],
                    'LW': [
                        {
                            data                : [19, 16, 42, 23],
                            backgroundColor     : [
                                '#F44336',
                                '#9C27B0',
                                '#03A9F4',
                                '#E91E63'
                            ],
                            hoverBackgroundColor: [
                                '#F45A4D',
                                '#A041B0',
                                '#25B6F4',
                                '#E9487F'
                            ]
                        }
                    ],
                    '2W': [
                        {
                            data                : [18, 17, 40, 25],
                            backgroundColor     : [
                                '#F44336',
                                '#9C27B0',
                                '#03A9F4',
                                '#E91E63'
                            ],
                            hoverBackgroundColor: [
                                '#F45A4D',
                                '#A041B0',
                                '#25B6F4',
                                '#E9487F'
                            ]
                        }
                    ]
                },
                options : {
                    cutoutPercentage   : 66,
                    spanGaps           : false,
                    legend             : {
                        display : true,
                        position: 'bottom',
                        labels  : {
                            padding      : 16,
                            usePointStyle: true
                        }
                    },
                    maintainAspectRatio: false
                }
            },
            'footerLeft'  : {
                'title': 'Tasks Added',
                'count': {
                    '2W': 487,
                    'LW': 526,
                    'TW': 594
                }
            },
            'footerRight' : {
                'title': 'Tasks Completed',
                'count': {
                    '2W': 193,
                    'LW': 260,
                    'TW': 287
                }
            }
        },
        'widget7'      : {
            'title'       : 'Schedule',
            'currentRange': 'T',
            'ranges'      : {
                'T' : 'Today',
                'TM': 'Tomorrow'
            },
            'schedule'    : {
                'T' : [
                    {
                        'id'   : 1,
                        'title': 'Group Meeting',
                        'time' : 'In 32 minutes'
                    },
                    {
                        'id'   : 2,
                        'title': 'Coffee Break',
                        'time' : '10:30 AM'
                    },
                    {
                        'id'   : 3,
                        'title': 'Public Beta Release',
                        'time' : '11:00 AM'
                    },
                    {
                        'id'   : 4,
                        'title': 'Lunch',
                        'time' : '12:10 PM'
                    },
                    {
                        'id'   : 5,
                        'title': 'Dinner with David',
                        'time' : '17:30 PM'
                    },
                    {
                        'id'   : 6,
                        'title': 'Jane\'s Birthday Party',
                        'time' : '19:30 PM'
                    },
                    {
                        'id'   : 7,
                        'title': 'Overseer\'s Retirement Party',
                        'time' : '21:30 PM'
                    }
                ],
                'TM': [
                    {
                        'id'   : 1,
                        'title': 'Marketing Meeting',
                        'time' : '09:00 AM'
                    },
                    {
                        'id'   : 2,
                        'title': 'Public Announcement',
                        'time' : '11:00 AM'
                    },
                    {
                        'id'   : 3,
                        'title': 'Lunch',
                        'time' : '12:10 PM'
                    },
                    {
                        'id'   : 4,
                        'title': 'Meeting with Beta Testers',
                        'time' : '15:00 AM'
                    },
                    {
                        'id'   : 5,
                        'title': 'Live Stream',
                        'time' : '17:30 PM'
                    },
                    {
                        'id'   : 6,
                        'title': 'Release Party',
                        'time' : '19:30 PM'
                    },
                    {
                        'id'   : 7,
                        'title': 'CEO\'s Party',
                        'time' : '22:30 PM'
                    }
                ]
            }
        },
        'schemeExpenditureWidget'      : {
            'title'    : 'Regionwise Scheme Distribution',
            'mainChart': {
                labels  : [
                    'North',
                    'West',
                    'South',
                    'East',
                    'Central'
                ],
                datasets: [
                    {
                        data                : [12, 17, 28, 25, 15],
                        backgroundColor     : [
                            '#F44336',
                            '#9C27B0',
                            '#03A9F4',
                            '#E91E63',
                            '#FFC107'
                        ],
                        hoverBackgroundColor: [
                            '#F45A4D',
                            '#A041B0',
                            '#25B6F4',
                            '#E9487F',
                            '#FFD341'
                        ]
                    }
                ],
                options : {
                    cutoutPercentage   : 0,
                    spanGaps           : false,
                    legend             : {
                        display : true,
                        position: 'bottom',
                        labels  : {
                            padding      : 16,
                            usePointStyle: true
                        }
                    },
                    maintainAspectRatio: false
                }
            }
        },
        'widget9'      : {
            'title'       : 'Redemption',
            'ranges'      : {
                'TW': 'This Week',
                'LW': 'Last Week',
                '2W': '2 Weeks Ago'
            },
            'currentRange': 'TW',
            'weeklySpent' : {
                'title': 'WEEKLY REDEMPTION',
                'count': {
                    '2W': '2,682.85',
                    'LW': '1,445.34',
                    'TW': '3,630.15'
                },
                'chart': {
                    '2W'   : {
                        datasets: [
                            {
                                label          : 'Created',
                                data           : [2, 6, 5, 4, 5, 3, 6],
                                fill           : true,
                                backgroundColor: '#42BFF7',
                                pointRadius    : 0,
                                pointHitRadius : 20,
                                borderWidth    : 0
                            }
                        ],
                        labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    'LW'   : {
                        datasets: [
                            {
                                label          : 'Created',
                                data           : [4, 6, 2, 2, 1, 3, 4],
                                fill           : true,
                                backgroundColor: '#42BFF7',
                                pointRadius    : 0,
                                pointHitRadius : 20,
                                borderWidth    : 0
                            }
                        ],
                        labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    'TW'   : {
                        datasets: [
                            {
                                label          : 'Created',
                                data           : [2, 6, 5, 4, 5, 3, 6],
                                fill           : true,
                                backgroundColor: '#42BFF7',
                                pointRadius    : 0,
                                pointHitRadius : 20,
                                borderWidth    : 0
                            }
                        ],
                        labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    options: {
                        legend             : {
                            display: false
                        },
                        maintainAspectRatio: false,
                        scales             : {
                            xAxes: [
                                {
                                    display: false
                                }
                            ],
                            yAxes: [
                                {
                                    display: false
                                }
                            ]
                        }
                    }
                }
            },
            'totalSpent'  : {
                'title': 'TOTAL REDEMPTION',
                'count': {
                    '2W': '29,682.85',
                    'LW': '31,128.19',
                    'TW': '34,758.34'
                },
                'chart': {
                    '2W'   : {
                        datasets: [
                            {
                                label          : 'Created',
                                data           : [3, 2, 2, 4, 7, 7, 4],
                                fill           : true,
                                backgroundColor: '#42BFF7',
                                pointRadius    : 0,
                                pointHitRadius : 20,
                                borderWidth    : 0
                            }
                        ],
                        labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    'LW'   : {
                        datasets: [
                            {
                                label          : 'Created',
                                data           : [5, 7, 8, 8, 6, 4, 1],
                                fill           : true,
                                backgroundColor: '#42BFF7',
                                pointRadius    : 0,
                                pointHitRadius : 20,
                                borderWidth    : 0
                            }
                        ],
                        labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    'TW'   : {
                        datasets: [
                            {
                                label          : 'Created',
                                data           : [6, 4, 7, 5, 5, 4, 7],
                                fill           : true,
                                backgroundColor: '#42BFF7',
                                pointRadius    : 0,
                                pointHitRadius : 20,
                                borderWidth    : 0
                            }
                        ],
                        labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    options: {
                        legend             : {
                            display: false
                        },
                        maintainAspectRatio: false,
                        scales             : {
                            xAxes: [
                                {
                                    display: false
                                }
                            ],
                            yAxes: [
                                {
                                    display: false
                                }
                            ]
                        }
                    }
                }
            },
            'remaining'   : {
                'title': 'REMAINING',
                'count': {
                    '2W': '94.317,15',
                    'LW': '92.871,81',
                    'TW': '89.241,66'
                },
                'chart': {
                    '2W'   : {
                        datasets: [
                            {
                                label          : 'Created',
                                data           : [1, 4, 5, 7, 8, 2, 4],
                                fill           : true,
                                backgroundColor: '#42BFF7',
                                pointRadius    : 0,
                                pointHitRadius : 20,
                                borderWidth    : 0
                            }
                        ],
                        labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    'LW'   : {
                        datasets: [
                            {
                                label          : 'Created',
                                data           : [3, 2, 1, 4, 8, 8, 4],
                                fill           : true,
                                backgroundColor: '#42BFF7',
                                pointRadius    : 0,
                                pointHitRadius : 20,
                                borderWidth    : 0
                            }
                        ],
                        labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    'TW'   : {
                        datasets: [
                            {
                                label          : 'Created',
                                data           : [2, 4, 8, 6, 2, 5, 1],
                                fill           : true,
                                backgroundColor: '#42BFF7',
                                pointRadius    : 0,
                                pointHitRadius : 20,
                                borderWidth    : 0
                            }
                        ],
                        labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    options: {
                        legend             : {
                            display: false
                        },
                        maintainAspectRatio: false,
                        scales             : {
                            xAxes: [
                                {
                                    display: false
                                }
                            ],
                            yAxes: [
                                {
                                    display: false
                                }
                            ]
                        }
                    }
                }
            },
            'totalBudget' : {
                'title': 'TOTAL ACCRUED',
                'count': '124.000,00'
            }
        },
        'widget11': {
            table: {rows:[]}
                }
        },
    projects: [
        {
            'id'  : 1,
            'name': 'ACME Corp. Backend App'
        },
        {
            'id'  : 2,
            'name': 'ACME Corp. Frontend App'
        },
        {
            'id'  : 3,
            'name': 'Creapond'
        },
        {
            'id'  : 4,
            'name': 'Withinpixels'
        }
    ]
};

mock.onGet('/api/project-dashboard-app/widgets').reply((config) => {
    return [200, projectDashboardAppDB.widgets];
});

mock.onGet('/api/project-dashboard-app/projects').reply((config) => {
    return [200, projectDashboardAppDB.projects];
});
