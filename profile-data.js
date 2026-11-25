/* Based on Yu Yan's November 2026 résumé, project reports and The Five Elements portfolio. */
window.profileData = {
  about: {
    name: "Yu Yan",
    en: "Yu Yan",
    headline: "Human geography, photography and life on the trail",
    bio: "I love the freedom to wander and see how people live. The kind of urban planning I believe in gives both a neighborhood and its river room to thrive. Wherever I travel, I practice Leave No Trace.",
    education: [
      {
        title: "Hainan University",
        subtitle: "B.M. in Human Geography and Urban-Rural Planning",
        date: "Sep 2023 – Jun 2027 (expected)"
      },
      {
        title: "Arizona State University",
        subtitle: "B.S. in Parks, Recreation and Sport Management",
        date: "Sep 2023 – Jun 2027 (expected)"
      },
      {
        title: "Fudan University",
        subtitle: "International Summer School Program on Climate Change and Related Risks",
        date: "Jul – Aug 2026"
      },
      {
        title: "St Peter’s School",
        subtitle: "High school exchange · Auckland, New Zealand"
      }
    ],
    stats: [
      {value: "27", label: "Countries visited abroad"},
      {value: "5", label: "Continents"},
      {value: "2", label: "Publications"}
    ]
  },
  internships: [
    {
      id: "icenecdev",
      website: "https://www.icenecdev.org/",
      title: "International Centre for Environmental Education and Community Development (ICENECDEV)",
      role: "Environmental Health and Sustainable Development Project Intern",
      place: "Cameroon community programs",
      date: "Sep 2026 – present",
      relatedProject: ["cameroon-clean-energy", "Clean energy and environmental health in rural Cameroon"],
      summary: "I studied how wood-fired cooking exposes rural families to indoor smoke and what adopting improved stoves might mean for women and children.",
      details: [
        "I reviewed clean cooking technologies for their potential to reduce smoke exposure and firewood use, alongside the resource constraints rural households face.",
        "I helped coordinate the 2026 Miss Environment Contest, which encourages young women to take part in local environmental initiatives."
      ]
    },
    {
      id: "schneider",
      website: "https://www.se.com/",
      title: "Schneider Electric",
      role: "Sustainability Engineer Intern",
      place: "Shanghai, China",
      date: "Jul – Sep 2026",
      relatedProject: ["schneider-maintenance", "AI-enabled equipment monitoring and predictive maintenance"],
      summary: "I developed a predictive maintenance platform that brought live equipment readings, alarms and failure records together so engineers could trace a fault.",
      details: [
        "I connected operating data through Matrikon OPC DA and used PostgreSQL and InfluxDB to store maintenance records and time-series measurements.",
        "On a project for Baosight Software, I implemented a knowledge platform for maintenance teams and ran more than 100 automated tests. The project reduced analysis time by 40%."
      ]
    },
    {
      id: "cs-environment",
      website: "http://www.cseti.com.cn/",
      compactLogo: "media/employer-cs-environment-mark.png",
      title: "Central-Southern Safety & Environment Technology Institute Co., Ltd.",
      role: "Environmental Consultant Intern",
      place: "Wuhan, China",
      date: "Mar – May 2026",
      relatedProject: ["han-river", "Yujiahu wastewater treatment plant outfall assessment"],
      summary: "I modeled how pollutants disperse downstream of a wastewater outfall and investigated soil and groundwater contamination at a former phosphorus chemical plant.",
      details: [
        "For the Yujiahu outfall assessment, I built a two-dimensional MIKE 21 model covering 11.06 km of the Han River.",
        "At the industrial site, I analyzed 129 soil samples from 36 locations and groundwater data from 11 wells. Ammonia nitrogen in groundwater reached 95.32 mg/L."
      ]
    },
    {
      id: "hubei-planning",
      website: "https://www.hbsghy.com/",
      compactLogo: "media/employer-hubei-planning-mark.png",
      title: "Hubei General Institute of Planning and Design Co., Ltd.",
      role: "Design Assistant Intern",
      place: "Wuhan, China",
      date: "Jan – Mar 2026",
      summary: "I worked on a county plan in the Yixun River valley and mapped permitted land uses on the Yangtze floodplain at Jianli.",
      details: [
        "In Weichang, I analyzed access to public services and connections between ecological corridors using records from 29 government departments and 11 enterprises.",
        "In Jianli, I mapped land-use zones in ArcGIS and AutoCAD and examined constraints involving eight clean-energy projects and 630 mu of protected land."
      ]
    },
    {
      id: "hubei-nr",
      website: "https://zrzyt.hubei.gov.cn/",
      title: "Hubei Provincial Department of Natural Resources",
      role: "Intern, Specialized Planning Department",
      place: "Yichang, China",
      date: "Jul – Sep 2025",
      relatedProject: ["three-gorges", "Three Gorges reservoir plan"],
      summary: "I conducted field investigations and stakeholder consultations in Yichang and Enshi for the territorial spatial plan of the Three Gorges Reservoir Area.",
      details: [
        "I led drafting for two sections of the plan, covering water security and the proposed Three Gorges New Shipping Corridor.",
        "I compared land use and the location of industry along the reservoir to see where settlement growth, ecological protection and transport needs compete for the same shoreline."
      ]
    },
    {
      id: "hubei-land",
      logo: "media/hubei-spatial-planning-institute-logo.png",
      logoAlt: "Hubei Spatial Planning Institute logo",
      website: "https://zrzyt.hubei.gov.cn/fbjd/xxgkml/jgzn/zsdw/202204/t20220407_4072916.shtml",
      title: "Hubei Provincial Institute of Spatial Planning",
      role: "Intern, General Planning Department",
      place: "Wuhan, China",
      date: "Dec 2024 – Feb 2025",
      summary: "I reviewed municipal and county spatial plans and worked on functional zoning across Hubei Province.",
      details: [
        "I identified 27 issues in land use and in the consistency of plans, and helped the planning team prepare revisions.",
        "I analyzed 103 county-level units to examine how provincial policy could accommodate agriculture, ecological protection and urban development in different places."
      ]
    }
  ],
  projects: [
    {
      "id": "shenzhen-heat",
      "title": "Street-Level Heat Exposure & Inequality in Shenzhen: Occupational Mobility & Built Environment Drivers",
      "en": "Peking University · Occupational heat exposure",
      "category": "Research",
      "place": "Shenzhen, China",
      "date": "Aug 2025 – present",
      "portfolioPage": 5,
      "summary": "A delivery rider can cross several neighborhoods in the time a street cleaner spends on one block. In Shenzhen, I study how those movements change the heat people encounter over a working day. An average for the neighborhood where someone lives leaves much of that day unaccounted for.",
      "details": [
        "I used mobile phone signaling records to examine the movement patterns of 15 occupational groups. Their routes and stops provide a way to link time spent outdoors with 16 built-environment indicators, including building coverage, building height and features visible from the street.",
        "For the 2025 data preparation, I examined a June thermal-comfort raster at 1 km resolution alongside second-quarter building coverage and height data at roughly 40 m. These are separate inputs to the proposed street-scale analysis. In my portfolio, I use shaded stops to ask whether a worker could reach one and get back before a break ends."
      ],
      "institution": "School of Urban Planning and Design, Peking University"
    },
    {
      "id": "three-gorges",
      "title": "Territorial Spatial Plan for the Three Gorges Reservoir Area",
      "en": "Hubei Provincial Department of Natural Resources · Spatial planning",
      "category": "Planning",
      "place": "Three Gorges Reservoir Area, China",
      "date": "Jul – Sep 2025",
      "portfolioPage": 7,
      "summary": "Along the Three Gorges Reservoir, towns, roads and farms share a narrow corridor between the Yangtze and steep slopes. Working with residents and officials in Yichang and Enshi, I examined how development limits appear on regional plans and what they mean for people who depend on the land.",
      "details": [
        "I led drafting for the sections on water security and the Three Gorges New Shipping Corridor. Field visits and consultations helped our team identify issues that extended across municipal boundaries, including how new transport links would fit alongside existing settlements and areas set aside for protection.",
        "For my portfolio, I assembled three adjoining shoreline maps. The first shows land use near Chongqing, the second follows road and rail connections toward Wanzhou, and the third locates geological hazard zones near Fengjie and Wushan. Keeping the river in view across all three panels connects planning questions that are usually presented on separate maps."
      ],
      "institution": "Hubei Provincial Department of Natural Resources",
      "employerId": "hubei-nr"
    },
    {
      "id": "hainan-rainforest",
      "title": "Production–Living–Ecological Spaces in Hainan Tropical Rainforest National Park",
      "en": "Hainan University · Conservation and community livelihoods",
      "category": "Research",
      "place": "Hainan Tropical Rainforest National Park, China",
      "date": "Sep 2025 – Jun 2026",
      "portfolioPage": 9,
      "summary": "What changes at the edge of a national park when the same land supports conservation, work and everyday life? In Hainan, I approached this question through river monitoring, spatial analysis and conversations with residents who depend on the surrounding landscape.",
      "details": [
        "I mapped water-quality records from 15 stations in the Zhuxi River Basin between 2021 and 2025. I compared the distribution of chemical oxygen demand, ammonia nitrogen and total phosphorus with surrounding land uses and observations from field visits. The station records show where conditions varied and suggest places to investigate the activities upstream.",
        "Interviews added questions that the monitoring stations could not answer, including how protection policies affect livelihoods, access to public services and village development. A separate portfolio map locates nighttime lights in relation to core protection and general control zones. I kept each year's display range visible so readers can interpret the position of the lights without treating changes in image brightness as measured growth."
      ],
      "institution": "Hainan University"
    },
    {
      "id": "schneider-maintenance",
      "title": "AI-Enabled Equipment Monitoring and Predictive Maintenance Platform",
      "en": "Schneider Electric · Industrial monitoring",
      "institution": "Schneider Electric",
      "employerId": "schneider",
      "category": "Engineering",
      "place": "Shanghai, China",
      "date": "Jul – Sep 2026",
      "summary": "When a piece of equipment raises an alarm, the engineer diagnosing it needs to know what happened beforehand and whether anyone has seen the fault before. At Schneider Electric, I worked on giving engineers access to both operating data and past maintenance experience.",
      "details": [
        "I connected live equipment readings through Matrikon OPC DA and used PostgreSQL and InfluxDB to bring maintenance records and time-series measurements into the monitoring platform. Viewing the alarms alongside a history of operating conditions gave engineers a way to trace equipment behavior leading up to a fault.",
        "In a related project for Baosight Software, I implemented a knowledge management system that drew on maintenance records and used a language model to help retrieve relevant information. I ran more than 100 automated tests. The team recorded a 40% reduction in analysis time on that project."
      ]
    },
    {
      "id": "volve-rock",
      "title": "Quantitative Modelling of Lithology Using Well-Log Data from the Volve Oil Field, Norway",
      "en": "Symmetry · Co-first author",
      "category": "Research",
      "place": "Volve oil field dataset, Norway",
      "date": "Dec 2025 – Aug 2026",
      "summary": "Well logs record how rock responds to instruments lowered into a borehole. In Norway's Volve oil field, my coauthors and I examined whether those responses could distinguish nine rock types, including types with very few examples in the data.",
      "details": [
        "I worked with records from nine wells and 11 features, including depth, resistivity, gamma ray, porosity and acoustic response. We identified anomalous records, addressed the imbalance between common and rare classes, and compared XGBoost with other classifiers. By testing the optimization stages separately, we could examine what each contributed to the final model.",
        "On the study's test set, the final model achieved an F1 score of 0.9862. That figure describes performance within the Volve dataset. Independent wells would provide a further test of how well the model transfers to new geological settings. I share first authorship of the resulting Symmetry paper and contributed to the methodology, analysis, software, validation and original draft."
      ],
      "publicationId": "symmetry"
    },
    {
      "id": "landscape-recognition",
      "title": "Deep Learning for Natural Landscape and Heritage Recognition in China",
      "en": "Chinese Academy of Sciences · Natural heritage",
      "category": "Research",
      "place": "China",
      "date": "Jul – Sep 2025",
      "summary": "A rock face photographed from the ground can reveal contours and exposed surfaces that are difficult to pick out in an overhead image. At the Chinese Academy of Sciences, I worked on recognizing natural landforms from oblique photographs and linking the results to their geographic setting.",
      "details": [
        "The wider project had collected 5,533 photographs, of which 2,191 had been annotated by August 2025. Its tasks ranged from identifying Danxia rock forms and river bends to distinguishing vegetation and estimating the area of bare rock. These require different visual judgments, from recognizing the whole scene to locating a feature within it. At training epoch 249, the team's detector reached 96.5% precision and 82.2% mean average precision at an overlap threshold of 0.50.",
        "My work included graph neural network development and linking recognition with geolocation and map matching. A field photograph with coordinates can be located within a mapped landform region, giving a surveyor a second source of evidence when interpreting a proposed label."
      ],
      "institution": "Institute of Geographic Sciences and Natural Resources Research, Chinese Academy of Sciences"
    },
    {
      "id": "igem",
      "title": "2026 International Genetically Engineered Machine (iGEM) Competition",
      "en": "HainanU-YZ-China · Silver Medal",
      "category": "Research",
      "place": "Hainan, China",
      "date": "Dec 2025 – Nov 2026",
      "summary": "For HainanU-YZ-China's iGEM project, I focused on the people who might use a new approach to tomato crop protection and on the environmental questions their decisions would raise. As a core team member, my responsibilities centered on environmental health and sustainable development.",
      "details": [
        "I took part in interviews with growers, consumers and agricultural specialists in Hainan. We used their different perspectives to ask what handling a treatment might mean for a worker, what consumers want to know about food production, and what evidence would help assess effects beyond the crop.",
        "I used these perspectives to examine potential changes in occupational exposure, consumer health, resource use and effects on other organisms. The team wiki records our stakeholder conversations and sustainability assessment. I also took part in more than 20 public science activities. HainanU-YZ-China received the Silver Medal in the undergraduate section of the 2026 competition. Our assessment distinguished potential benefits from effects that still need to be measured."
      ],
      "institution": "HainanU-YZ-China · Undergraduate Silver Medal",
      "links": [
        {
          "label": "Team sustainability wiki",
          "href": "https://2026.igem.wiki/hainanu-yz-china/sustainability#section-4"
        },
        {
          "label": "Official iGEM certificate (PDF)",
          "href": "editions/iGEM-2026-HainanU-YZ-China-Certificate.pdf"
        }
      ]
    },
    {
      "id": "pcb-defect-sorting",
      "title": "PCB Board Defect Sorting System Based on Improved Detection Algorithm",
      "en": "IEEE ICMTIM · Second author",
      "category": "Conference paper",
      "place": "ICMTIM",
      "date": "Apr 2026",
      "summary": "My coauthor and I studied how a defect detector can support automated sorting of printed circuit boards. The practical question was how often a defect flagged by the system corresponded to a real fault.",
      "details": [
        "The improved detector raised precision from 79.1% to 89.6%, a gain of 10.5 percentage points. Precision measures the share of flagged defects that were correct. I am second author of the paper, published in the proceedings of the 7th International Conference on Mechatronics Technology and Intelligent Manufacturing."
      ],
      "publicationId": "pcb"
    },
    {
      "id": "weichang",
      "title": "Regulatory Detailed Plan for Weichang County",
      "en": "Hubei General Institute of Planning and Design · County planning",
      "category": "Planning",
      "place": "Weichang, Hebei, China",
      "date": "2026",
      "portfolioPage": 4,
      "summary": "In central Weichang, the Yixun River follows the same narrow valley floor that carries roads, neighborhoods and public facilities. I helped prepare the county's regulatory detailed plan and examined how the shape of the valley influences the practical choices available to a growing town.",
      "details": [
        "I worked with materials from 29 government departments and 11 enterprises to study access to public services, links between ecological corridors and the distribution of open space. The plan considered where schools, community health facilities and other everyday services would fit within 15-minute living circles.",
        "My portfolio study uses the three terraces west of the river to explain a feature of the plan. The lowest terrace lies between Zhuifeng Road and the river, while the two higher terraces rise inland. Their elevation differences help explain why the most continuous space for urban expansion lies to the north and south along the valley."
      ],
      "employerId": "hubei-planning"
    },
    {
      "id": "han-river",
      "title": "Sewage Outlet Assessment for the Yujiahu Wastewater Treatment Plant",
      "en": "Central-Southern Safety & Environment Technology Institute · Water quality modelling",
      "category": "Environmental assessment",
      "place": "Xiangyang, Hubei, China",
      "date": "2026",
      "summary": "For the proposed expansion of the Yujiahu wastewater outfall, I examined how treated effluent would mix with the Han River and where its influence might extend downstream.",
      "details": [
        "I built a two-dimensional MIKE 21 model with 1,824 triangular elements and 1,100 nodes. The modeled reach began about 1 km above the outfall and extended 10.06 km downstream, ending upstream of a drinking-water protection area.",
        "I compared the modeled distribution of chemical oxygen demand, ammonia nitrogen and total phosphorus under normal and abnormal discharge conditions. Following their concentrations along the river helped the project team evaluate which downstream water uses would be relevant to the outfall assessment."
      ],
      "employerId": "cs-environment"
    },
    {
      "id": "hainan-edna",
      "title": "eDNA-Based Biodiversity Monitoring and Ecosystem Health Assessment in Hainan, China",
      "en": "Hainan University · Biodiversity monitoring",
      "category": "Research",
      "place": "Hainan, China",
      "date": "Jan – Jul 2026",
      "summary": "In Hainan, I worked with the State Key Laboratory of Marine Resource Utilization in South China Sea to interpret biodiversity survey records. Environmental DNA lets a survey register traces of organisms in water, including species that observers may miss during a site visit.",
      "details": [
        "My contribution was to organize detection records for three protected species and two invasive species and relate them to conservation monitoring, fisheries management and restoration planning. The wider team also developed targeted field tests and described coastal monitoring applications around Yazhou Bay. Those examples illustrate the scope of the team's work alongside the records I analyzed."
      ]
    },
    {
      "id": "cameroon-clean-energy",
      "title": "Clean Energy and Environmental Health in Rural Cameroon",
      "en": "ICENECDEV · Clean cooking and community participation",
      "category": "Environmental health",
      "place": "Cameroon",
      "date": "Sep 2026 – present",
      "employerId": "icenecdev",
      "institution": "International Centre for Environmental Education and Community Development (ICENECDEV)",
      "summary": "At ICENECDEV, I studied how cooking with wood affects the air that women and children breathe at home. I reviewed improved cookstoves with two questions in mind. How much smoke could a household avoid, and how much firewood would it still need?",
      "details": [
        "ICENECDEV’s Mount Cameroon programme trained residents to build stoves from local materials. My research examined how household resources and community participation affect the adoption of cleaner cooking technologies.",
        "I also helped plan and coordinate the 2026 Miss Environment Contest, where young women develop environmental initiatives of their own. The programme welcomes ideas on issues such as access to energy, water and sanitation, and waste management."
      ],
      "links": [
        {
          "label": "ICENECDEV air quality programme",
          "href": "https://icenecdev.org/air-quality.php"
        },
        {
          "label": "Miss Environment Contest",
          "href": "https://icenecdev.org/miss-environment.php"
        }
      ]
    }
  ],
  publications: [
    {
      id: "symmetry",
      title: "A Symmetry-Aware GGA-XGB Model for Lithology Prediction Under Complex Geological Conditions",
      venue: "Symmetry, 18(8), 1391",
      date: "Aug 2026",
      authors: "Yang Huang, Yu Yan, Yihang Zhao and Ling Wang",
      role: "Co-first author",
      doi: "10.3390/sym18081391",
      url: "https://doi.org/10.3390/sym18081391",
      summary: "A comparison of lithology classifiers and a hybrid optimization approach for predicting rock types from well-log data."
    },
    {
      id: "pcb",
      title: "PCB Board Defect Sorting System Based on Improved Detection Algorithm",
      venue: "7th International Conference on Mechatronics Technology and Intelligent Manufacturing (ICMTIM), pp. 991–994",
      date: "2026",
      authors: "Mengqi Chen and Yu Yan",
      role: "Second author",
      doi: "10.1109/ICMTIM69588.2026.11525894",
      url: "https://doi.org/10.1109/ICMTIM69588.2026.11525894",
      summary: "A study of defect detection for an automated printed circuit board sorting system."
    }
  ],
  clubs: [
    {
      id: "outdoor-club",
      title: "HAIC Outdoor Recreation Club",
      role: "President",
      place: "Hainan University, China",
      date: "Sep 2023 – present",
      summary: "I organize and lead outdoor trips with the club. On my own, I have backpacked through 27 countries beyond China across five continents, photographing the landscapes and cities along the way.",
      details: [
        "Hiking, mountain walks and long rides around an island are among my favorite ways to get to know a place."
      ]
    },
    {
      id: "qiong-opera",
      title: "Qiong Opera Society",
      role: "Founder",
      place: "Hainan University, Haikou, China",
      date: "Oct 2023 – Sep 2025",
      summary: "I founded a 27-member opera society at the university's Language and Cultural Exchange Center. Working with the Hainan Qiong Opera Theatre, we brought this local opera tradition to campus.",
      details: [
        "I led performances including Red Leaf Inscribed with Poetry. More than 300 people took part in our performance activities."
      ]
    },
    {
      id: "same-sun",
      title: "Under the Same Sun",
      role: "Co-organizer and exhibiting photographer",
      place: "Liang Art Museum, Zhengzhou, China",
      date: "Jul – Aug 2026",
      summary: "I helped organize this group exhibition and showed Where Wings Find Rest, a series following urban birds from the reeds to paving stones and the roof of a parked car.",
      details: [
        "I helped plan the exhibition and coordinate it on site. I made the photographs in June and July 2025."
      ]
    }
  ]
};
