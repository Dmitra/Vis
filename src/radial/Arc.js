/**
 * Input data format
 * @position
 * @color
 */
var Radial = require('./Radial')
module.exports = function (options) {
    var self = this

    var defaults = {
        //position Number of total positions
        //if not set [min, max] values are used from data
        //positionMax: 10,
        factor: 1,
        colorCodingMin: undefined,
        colorCodingMax: undefined,
        colorRange: ['violet', 'red'],
    }
    self._defaults = _.extend(defaults, self._defaults)
    Radial.call(this, options);

    self._draw = self.draw
    self.draw = function (data) {
        self._draw(data)

        var path = self._g.attr('id', 'arcGroup' + self._config.name)
            .selectAll('.arc' + self._config.name)
            .data(data)
            .enter()
            .append('path')
            .attr('class', 'arc' + self._config.name)
            .attr('d', self.arc)
            .style('fill', function(d) { return self._color(d.color); })
    }

    self.arc = d3.svg.arc()
        .startAngle(function(d) {
            return self.toRad(d.position) + self._rotateRad
        })
        .endAngle(function(d) { return self.toRad(d.position + 1) + self._rotateRad })
        .innerRadius(self._config.innerRadius)
        .outerRadius(self._config.innerRadius + self._config.radius)

    //Move to center
    self._g.attr('transform', 'translate(' + self._config.width / 2 + ',' + (self._config.height / 2) + ')');

}
