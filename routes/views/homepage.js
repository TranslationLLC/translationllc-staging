var keystone = require('keystone'),
    Homepage = keystone.list('Homepage'),
    BaseComponent = keystone.list('BaseComponent'),
    SlideComponent = keystone.list('SlideComponent');
function renderHomepage(sectionsIndex, anchorSectionsOrder, sectionsIndexArray, view) {
  for (var key in sectionsIndex) {
    sectionsIndexArray[anchorSectionsOrder[key]] = {
      hash: key,
      order: anchorSectionsOrder[key],
      components: sectionsIndex[key]
    };
  }
  view.render('homepage', {sectionsIndexArray: sectionsIndexArray});
}
module.exports = function(req, res) {
  var view = new keystone.View(req, res);
  view.render('homepage');
  // homepage,
  // componentsProcessed = 0,
  // sectionsIndexArray = [],
  // anchorSectionsOrder = {
  //   lead: "0",
  //   work: "1",
  //   culture: "2"
  // }
  // sectionsIndex = {};
  // Homepage.model.find()
  //   .exec()
  //   .then(function(homepage) {
  //     homepage = homepage[0];
  //     BaseComponent.model.find()
  //       .where('_id')
  //       .in(homepage.components)
  //       .exec()
  //       .then(function(components) {
  //         components.forEach(function(component) {
  //           if (component.contentStyles) {
  //           }
  //           if (!sectionsIndex.hasOwnProperty(component.anchorSection)) {
  //             sectionsIndex[component.anchorSection] = [];
  //             sectionsIndex[component.anchorSection][component.componentOrderNumber] = component;
  //           } else {
  //             sectionsIndex[component.anchorSection][component.componentOrderNumber] = component;
  //           }
  //           if (component.componentType === 'carousel') {
  //             SlideComponent.model.find()
  //               .where('_id')
  //               .in(component.slides)
  //               .exec()
  //               .then(function(slides) {
  //                 componentsProcessed++;
  //                 component.slides = slides;
  //                 if (componentsProcessed === components.length) {
  //                   // console.log('sectionsIndex ', sectionsIndex);
  //                   for (var key in sectionsIndex) {
  //                     sectionsIndexArray[anchorSectionsOrder[key]] = {
  //                       hash: key,
  //                       order: anchorSectionsOrder[key],
  //                       components: sectionsIndex[key]
  //                     };
  //                   }
  //                   console.log('render homepage');
  //                   view.render('homepage', {sectionsIndexArray: sectionsIndexArray});
  //                 }
  //               });
  //           } else {
  //             componentsProcessed++;
  //           }
  //         });
  //       });
  //   });
  // var view = new keystone.View(req, res),
  //     homepage,
  //     componentsProcessed = 0,
  //     sectionsIndexArray = [],
  //     anchorSectionsOrder = {
  //       lead: "0",
  //       work: "1",
  //       culture: "2"
  //     }
  //     sectionsIndex = {};
  // Homepage.model.find()
  //   .exec()
  //   .then(function(homepage) {
  //     homepage = homepage[0];
  //     BaseComponent.model.find()
  //       .where('_id')
  //       .in(homepage.components)
  //       .exec()
  //       .then(function(components) {
  //         components.forEach(function(component) {
  //           if (component.contentStyles) {
  //           }
  //           if (!sectionsIndex.hasOwnProperty(component.anchorSection)) {
  //             sectionsIndex[component.anchorSection] = [];
  //             sectionsIndex[component.anchorSection][component.componentOrderNumber] = component;
  //           } else {
  //             sectionsIndex[component.anchorSection][component.componentOrderNumber] = component;
  //           }
  //           if (component.componentType === 'carousel') {
  //             SlideComponent.model.find()
  //               .where('_id')
  //               .in(component.slides)
  //               .exec()
  //               .then(function(slides) {
  //                 componentsProcessed++;
  //                 component.slides = slides;
  //                 if (componentsProcessed === components.length) {
  //                   renderHomepage(sectionsIndex, anchorSectionsOrder, sectionsIndexArray, view);
  //                 }
  //               });
  //           } else {
  //             componentsProcessed++;
  //             if (componentsProcessed === components.length) {
  //               renderHomepage(sectionsIndex, anchorSectionsOrder, sectionsIndexArray, view);
  //             }
  //           }
  //         });
  //       });
  //   });
}
