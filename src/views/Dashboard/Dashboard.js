import React from "react";
import Axios from "axios";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import ChartistGraph from "react-chartist";
// @material-ui/core
import {makeStyles} from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import {casesByYearChart, celllineSummaryChart, typeSummaryChart,} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function maxDate(arr) {
  var maxDt = arr[0],
    maxDtObj = new Date(arr[0]);
  arr.forEach(function (dt) {
    if (new Date(dt) > maxDtObj) {
      maxDt = dt;
      maxDtObj = new Date(dt);
    }
  });
  return maxDt;
}

function minDate(arr) {
  var minDt = arr[0],
    minDtObj = new Date(arr[0]);
  arr.forEach(function (dt) {
    if (new Date(dt) < minDtObj) {
      minDt = dt;
      minDtObj = new Date(dt);
    }
  });
  return minDt;
}

function deduplicate(arr) {
  return Array.from(new Set(arr));
}

function groupBy(obj) {
  return obj.reduce((acc, value) => {
    acc[value] = acc[value] + 1 || 1;
    return acc;
  }, {});
}

function sortObject(obj) {
  var sortable = [];
  for (var key in obj) {
    sortable.push([key, obj[key]]);
  }

  sortable.sort((a, b) => {
    return a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0;
  });

  var orderedList = {};
  for (var idx in sortable) {
    orderedList[sortable[idx][0]] = sortable[idx][1];
  }

  return orderedList;
}

function sliceObject(obj, num) {
  return Object.keys(obj)
    .slice(0, num)
    .reduce((result, key) => {
      result[key] = obj[key];
      return result;
    }, {});
}

function chartData(arr) {
  const object = {
    labels: Object.keys(arr),
    series: [Object.values(arr)],
  };
  return object;
}

function chartMaxOptions(chart, max, margin) {
  const options = chart.options;
  options.high = max + margin;
  return options;
}

function stringSplitIntoArray(arr) {
  var array = [];
  arr.map((c) => {
    return c.split(" | ").map((c) => {
      return array.push(c);
    });
  });
  return array;
}

const useStyles = makeStyles(styles);

export default function Dashboard() {
  // styles
  const classes = useStyles();
  // states and functions
  const currentUser = useSelector(state => state.currentUser);

  const [data, setData] = React.useState({
    resourceType: "",
    id: "",
    meta: {
      lastUpdated: "",
    },
    type: "",
    total: 0,
    link: [
      {
        relation: "",
        url: "",
      },
    ],
    entry: [
      {
        fullUrl: "",
        resource: {
          resourceType: "",
          id: "",
          extension: [
            {
              url: "",
              extension: [
                {
                  url: "",
                  extension: [
                    {
                      url: "",
                      extension: [
                        {
                          url: "",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          identifier: [
            {
              system: "",
              value: "",
            },
          ],
          type: "",
          coordinateSystem: 0,
        },
      },
    ],
  });

  React.useEffect(() => {
    const url = `http://skku-milab.ddns.net:9080/fhir/MolecularSequence`
    // const url = `https://skku-milab.ddns.net:9080/fhir/MolecularSequence`
    // const url = `http://192.168.0.129:9080/fhir/MolecularSequence`
    let token = ""

    // Temporary
    currentUser.login = 'LOG_IN'
    // if (currentUser.login) {
    //   token = currentUser.user.access_token.value
    // }
    // Temporary


    const config = {
      headers: {
        "Content-Type": "application/fhir+json",
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    };
    const fetchData = async () => {
      await Axios
        .get(url, config)
        .then(async response => {
          if (response.status === 200) {
            await setData(response.data);
          } else {
            console.log('error');
          }
        })
        .catch(err => {
          console.log('error is : ', err);
        });
    };

    if (currentUser.login) {
      fetchData().then(r => {
        console.log("Fetch data")
      });
    }
  }, [currentUser]);

  const parsedData = {
    projectsCount: "",
    identifier: [],
    projectId: [],
    sequencingType: [],
    targetGene: [],
    specimenType: [],
    samplingDate: [],
    samplingYear: [],
    cellline: [],
    dnaExtractionKit: [],
    od260280: [],
    od260230: [],
    dnaIntegrity: [],
    libraryInputAmount: [],
    libraryInsertSize: [],
    libraryConstructionKit: [],
    sequenceInstrument: [],
    readLength: [],
    sequencingDirection: [],
    runningMode: [],
    errorRate: [],
    percentDataQualityQ30: [],
    totalReads: [],
    meanCoverage: [],
    uniformity: [],
    onTargetRate: [],
    q30: [],
    prScore: [],
    mappingAlgorithm: [],
    saSofeware: [],
    vcSoftware: [],
    qualityScore: [],
    allelicReadPercentage: [],
    germlineFilterCriteria: [],
    referenceDB: [],
  };

  data.total === undefined
    ? console.log("loading total ...")
    : (parsedData.projectsCount = data.total);

  data.entry.map((c) => {
    c.resource.identifier === undefined
      ? console.log("loading identifier ...")
      : c.resource.identifier.map((c) => {
        parsedData.identifier.push(c.value);
        parsedData.projectId.push(c.system);
        return parsedData;
      });

    c.resource.extension === undefined
      ? console.log("loading extension ... ")
      : c.resource.extension.map((c) => {
        if (
          c.url === "http://example.org/fhir/StructureDefinition/QcMetrics"
        ) {
          c.extension.map((c) => {
            switch (c.url) {
              case "sequencingType":
                c.extension.map((c) => {
                  if (c.url === "sequencingType") {
                    parsedData.sequencingType.push(c.valueString);
                  } else if (c.url === "targetGene") {
                    parsedData.targetGene.push(c.valueString);
                  }

                  return parsedData;
                });
                break;
              case "sampleInformation":
                c.extension.map((c) => {
                  if (c.url === "specimenType") {
                    parsedData.specimenType.push(c.valueString);
                  } else if (c.url === "samplingDate") {
                    parsedData.samplingDate.push(c.valueString);
                    parsedData.samplingYear.push(
                      c.valueString.substring(0, 4)
                    );
                  } else if (c.url === "cellline") {
                    parsedData.cellline.push(c.valueString);
                  }

                  return parsedData;
                });
                break;
              case "dnaExtraction":
                c.extension.map((c) => {
                  if (c.url === "dnaExtractionKit") {
                    parsedData.dnaExtractionKit.push(c.valueString);
                  } else if (c.url === "dnaIntegrity") {
                    parsedData.dnaIntegrity.push(c.valueDecimal);
                  } else if (c.url === "dnaPurity") {
                    c.extension.map((c) => {
                      if (c.url === "od260280") {
                        parsedData.od260280.push(c.valueDecimal);
                      } else if (c.url === "od260230") {
                        parsedData.od260230.push(c.valueDecimal);
                      }

                      return parsedData;
                    });
                  }

                  return parsedData;
                });
                break;
              case "libraryConstruction":
                c.extension.map((c) => {
                  if (c.url === "libraryInputAmount") {
                    parsedData.libraryInputAmount.push(c.valueDecimal);
                  } else if (c.url === "libraryInsertSize") {
                    parsedData.libraryInsertSize.push(c.valueDecimal);
                  } else if (c.url === "libraryConstructionKit") {
                    parsedData.libraryConstructionKit.push(c.valueString);
                  }

                  return parsedData;
                });
                break;
              case "sequencingInformation":
                c.extension.map((c) => {
                  if (c.url === "sequenceInstrument") {
                    parsedData.sequenceInstrument.push(c.valueString);
                  } else if (c.url === "readLength") {
                    parsedData.readLength.push(c.valueDecimal);
                  } else if (c.url === "sequencingDirection") {
                    parsedData.sequencingDirection.push(c.valueString);
                  } else if (c.url === "runningMode") {
                    parsedData.runningMode.push(c.valueString);
                  }

                  return parsedData;
                });
                break;
              case "runningQuality":
                c.extension.map((c) => {
                  if (c.url === "errorRate") {
                    parsedData.errorRate.push(c.valueDecimal);
                  } else if (c.url === "percentDataQualityQ30") {
                    parsedData.percentDataQualityQ30.push(c.valueDecimal);
                  }

                  return parsedData;
                });
                break;
              case "dataQuality":
                c.extension.map((c) => {
                  if (c.url === "totalReads") {
                    parsedData.totalReads.push(c.valueDecimal);
                  } else if (c.url === "meanCoverage") {
                    parsedData.meanCoverage.push(c.valueDecimal);
                  } else if (c.url === "uniformity") {
                    parsedData.uniformity.push(c.valueDecimal);
                  } else if (c.url === "onTargetRate") {
                    parsedData.onTargetRate.push(c.valueDecimal);
                  } else if (c.url === "q30") {
                    parsedData.q30.push(c.valueDecimal);
                  } else if (c.url === "prScore") {
                    parsedData.prScore.push(c.valueDecimal);
                  }

                  return parsedData;
                });
                break;
              case "sequencingAlignment":
                c.extension.map((c) => {
                  if (c.url === "mappingAlgorithm") {
                    parsedData.mappingAlgorithm.push(c.valueString);
                  } else if (c.url === "sofeware") {
                    parsedData.saSofeware.push(c.valueString);
                  }

                  return parsedData;
                });
                break;
              case "variantCalling":
                c.extension.map((c) => {
                  if (c.url === "software") {
                    parsedData.vcSoftware.push(c.valueString);
                  } else if (c.url === "qualityScore") {
                    parsedData.qualityScore.push(c.valueDecimal);
                  } else if (c.url === "allelicReadPercentage") {
                    parsedData.allelicReadPercentage.push(c.valueDecimal);
                  }

                  return parsedData;
                });
                break;
              case "variantFilteringAndAnnotation":
                c.extension.map((c) => {
                  if (c.url === "germlineFilterCriteria") {
                    parsedData.germlineFilterCriteria.push(c.valueString);
                  } else if (c.url === "referenceDB") {
                    parsedData.referenceDB.push(c.valueString);
                  }

                  return parsedData;
                });
                break;
              default:
            }
            return parsedData;
          });
        }
        return parsedData;
      });
    return parsedData;
  });

  return (
    <div>
      {
      //   !currentUser.login ? (
      //   <div>
      //     <Redirect to="/admin/login"/>
      //   </div>
      // ) : (
        <div>
          <GridContainer>
            <GridItem xs={12} sm={6} md={6}>
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <Icon>apps</Icon>
                  </CardIcon>
                  <p className={classes.cardCategory}>PROJECTS</p>
                  <h3 className={classes.cardTitle}>
                    {numberWithCommas(deduplicate(parsedData.projectId).length)}
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <DateRange/>
                    {minDate(parsedData.samplingDate)} ~{" "}
                    {maxDate(parsedData.samplingDate)}
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
              <Card>
                <CardHeader color="primary" stats icon>
                  <CardIcon color="primary">
                    <Icon>content_copy</Icon>
                  </CardIcon>
                  <p className={classes.cardCategory}>CASES</p>
                  <h3 className={classes.cardTitle}>
                    {numberWithCommas(parsedData.projectsCount)}
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <DateRange/>
                    <LocalOffer/>
                    <Update/>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <Card chart>
                <CardHeader color="success">
                  <ChartistGraph
                    className="ct-chart"
                    data={chartData(groupBy(parsedData.samplingYear))}
                    type="Line"
                    options={chartMaxOptions(
                      casesByYearChart,
                      Math.max.apply(
                        null,
                        Object.values(groupBy(parsedData.samplingYear))
                      ),
                      100
                    )}
                    listener={casesByYearChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Cases by Year</h4>
                  <p className={classes.cardCategory}>
              <span className={classes.successText}>
                {/*<ArrowUpward className={classes.upArrowCardCategory} />*/}
              </span>{" "}
                    The number of cases by year
                  </p>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>{/*<AccessTime />*/}</div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card chart>
                <CardHeader color="warning">
                  <ChartistGraph
                    className="ct-chart"
                    data={chartData(groupBy(parsedData.specimenType))}
                    type="Bar"
                    options={chartMaxOptions(
                      casesByYearChart,
                      Math.max.apply(
                        null,
                        Object.values(groupBy(parsedData.specimenType))
                      ),
                      100
                    )}
                    responsiveOptions={typeSummaryChart.responsiveOptions}
                    listener={typeSummaryChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Sequencing Types</h4>
                  <p className={classes.cardCategory}>
                    Total cell lines are {" "}
                    {Math.max.apply(
                      null,
                      Object.values(groupBy(parsedData.specimenType))
                    )}
                    {"."}
                  </p>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>{/*<AccessTime />*/}</div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card chart>
                <CardHeader color="danger">
                  <ChartistGraph
                    className="ct-chart"
                    data={chartData(
                      sliceObject(
                        sortObject(
                          groupBy(stringSplitIntoArray(parsedData.cellline))
                        ),
                        5
                      )
                    )}
                    type="Line"
                    options={chartMaxOptions(
                      celllineSummaryChart,
                      Math.max.apply(
                        null,
                        Object.values(
                          groupBy(stringSplitIntoArray(parsedData.cellline))
                        )
                      ),
                      50
                    )}
                    listener={celllineSummaryChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Cell Lines</h4>
                  <p className={classes.cardCategory}>The list of cell lines</p>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>{/*<AccessTime />*/}</div>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      // )
      }
    </div>
  );
}
