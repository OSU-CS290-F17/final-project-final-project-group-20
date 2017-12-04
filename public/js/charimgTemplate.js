(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['charimg'] = template({"1":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression(container.lambda(depth0, depth0))
    + " ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<td>\r\n	<div class=\"tooltip\">\r\n		<img class=\""
    + alias4(((helper = (helper = helpers.alignment || (depth0 != null ? depth0.alignment : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"alignment","hash":{},"data":data}) : helper)))
    + " character\" data-name=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" data-alignment=\""
    + alias4(((helper = (helper = helpers.alignment || (depth0 != null ? depth0.alignment : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"alignment","hash":{},"data":data}) : helper)))
    + "\" data-rank=\""
    + alias4(((helper = (helper = helpers.rank || (depth0 != null ? depth0.rank : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rank","hash":{},"data":data}) : helper)))
    + "\" data-faction=\""
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.faction : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" src=\""
    + alias4(((helper = (helper = helpers.pic || (depth0 != null ? depth0.pic : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pic","hash":{},"data":data}) : helper)))
    + "\" />\r\n		<span class=\"tooltiptext\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\r\n	</div>\r\n</td>";
},"useData":true});
})();